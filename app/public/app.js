/**
 * Created with JetBrains WebStorm.
 * User: balwan
 * Date: 4/13/13
 * Time: 2:15 AM
 * To change this template use File | Settings | File Templates.
 */
var App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    // When everything is loaded.
    ready: function () {
        new FastClick(document.body);
    }
});
App.name = "EA";

App.Router.map(function () {
    // put your routes here
    this.resource('index', { path: '/' });
    this.resource('profile', {path: '/profile' }, function () {
        //this.route('detail', {path: '/profile/:profile_id'});
    });
    this.resource('needs', {path: '/needs' }, function () {
        this.route('bydate', {path: 'latest'});
        this.route('bypopularity', {path: 'mostpopular'});
        this.route('detail', {path: ':need_id'});
    });
    this.resource('new', {path: '/new' }, function () {
        this.route('need', {path: 'need'});
    })
});

/*Ember.LinkView.reopen({
 "data-toggle":'dropdown',
 attributeBindings:['href','title','data-toggle']
 });*/

App.EnterTextField = Ember.TextField.extend({
    // implementation of this function, see http://stackoverflow.com/a/995193/65542
    actionName: 'enterKeyDown',
    keyDown: function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            this.get('controller').send(this.actionName);
            return false;
        }
    }
});

App.ApplicationController = Ember.Controller.extend({

});

App.ApplicationRoute = Ember.Route.extend({
});

App.Needs = [
    {id: 0, title: 'Odvoz odpadu z farmy Bertranka', desc: 'lorem ipsum', imgurl: 'assets/placeholders/ponik-2.jpg', thumbsCount: 6, labels: ['odvoz', 'odpad', 'farma']},
    {id: 1, title: 'Posekání zahrady', desc: 'asdf asdf asd sd asdf', imgurl: 'assets/placeholders/need1.jpg', thumbsCount: 2, labels: ['zahrada']},
    {id: 2, title: 'Výměna píchnutého kola', desc: 'asdf asd fasd fasdf asd asd fasdf', imgurl: 'assets/placeholders/need1.jpg', thumbsCount: 1, labels: ['kolo']},
    {id: 3, title: 'Vyvenčít poníka', desc: 'asdf asd fasd fasdf asd asd fasdf', imgurl: 'assets/placeholders/ponik-7.jpg', thumbsCount: 0, labels: ['ponik', 'venceni']}
];


App.IndexRoute = Ember.Route.extend({
    redirect: function () {
        this.transitionTo('needs.bydate');
    }
});

// #################################
// PROFILE START
// #################################

App.ProfileRoute = Ember.Route.extend({
    model: function () {
        return {id: 0, name: 'Roman Kukuška', birthDate: '1984-02-13'};
    }
});

App.ProfileIndexController = Ember.ObjectController.extend({
    age: function () {
        var bd = moment(this.get('birthDate'));
        return moment().diff(bd, 'years');
    }.property('birthDate')
});
// #################################


// #################################
// NEEDS START
// #################################
App.NeedsRoute = Ember.Route.extend({
    setupController: function (controller) {
        controller.set('buttonCaption', 'alert');
        controller.alert = function (param) {
            alert('Controller alert!');
            controller.set('buttonCaption', 'green');
        }
    },
    events: {
        alert: function (param) {
            thumbsUp('NeedsRoute thumbsUp!');
        }
    }
});

App.NeedController = Ember.ObjectController.extend({

    thumbsClass: function () {
        if (this.get('thumbsCount') >= 20) return 'badge-info';
        else if (this.get('thumbsCount') >= 10) return 'badge-warning';
        else if (this.get('thumbsCount') >= 5) return 'badge-important';
        else if (this.get('thumbsCount') >= 1) return 'badge-success';
        else return '';
    }.property('thumbsCount'),
    thumbsUp: function () {
        this.set('thumbsCount', this.get('thumbsCount') + 1);
    }
});

App.NeedsDetailController = App.NeedController.extend({
});
App.NeedsDetailRoute = Ember.Route.extend({
    model: function (params) {
        return App.Needs[params.need_id];
    }
});


var NeedsByRoute = Ember.Route.extend({
    model: function (params) {
        return App.Needs;
    },
    renderTemplate: function () {
        this.render('needsList');
    },
    activate: function () {
        $(document).attr('title', 'Needs by date');
    },
    events: {
        alert: function (param) {
            alert('NeedsBydateRoute thumbsUp!');
        }
    }
    //setupController: function (controller, model) {}
});



App.NeedsBydateController = Ember.ArrayController.extend({
    itemController: 'Need'

});
App.NeedsBydateRoute = NeedsByRoute.extend({
    activate: function () {
        $(document).attr('title', 'Needs by date');
    }
});

App.NeedsBypopularityController = Ember.ArrayController.extend({
    itemController: 'Need',
    sortProperties: ['thumbsCount'],
    sortAscending: false
});
App.NeedsBypopularityRoute = NeedsByRoute.extend({
    model: function (params) {
        return App.Needs.copy();
        /*return App.Needs.copy().sort(function (a, b) {
            if (a.thumbsCount < b.thumbsCount) return -1;
            else if (a.thumbsCount > b.thumbsCount) return 1;
            else return 0;
        });
        */
    },
    activate: function () {
        $(document).attr('title', 'Needs by popularity');
    }
});
// #################################

// #################################
// CREATE
// #################################
App.NewNeedRoute = Ember.Route.extend({
    model: function () {
        return {tags: [], title: null}
    }
});
App.NewNeedController = Ember.ObjectController.extend({
    newTag: null,
    submitForm: function (event) {
        alert('onSubmit');
        App.Needs.pushObject({id: 100, title: this.get('title'), desc: '', imgurl: 'assets/placeholders/ponik-7.jpg',
            thumbsCount: 0, labels: this.content.tags});
        this.transitionTo('needs.bydate');
    },
    addTag: function (event) {
        this.content.tags.pushObject(this.get('newTag'));
        this.set('newTag', null)
    },
    checkEnter: function (event) {
        alert('checkEnter');
    }
});
// #################################
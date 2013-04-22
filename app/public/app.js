/**
 * Created with JetBrains WebStorm.
 * User: balwan
 * Date: 4/13/13
 * Time: 2:15 AM
 * To change this template use File | Settings | File Templates.
 */
var App = Ember.Application.create({
    LOG_TRANSITIONS: true
});
App.name = "EmberApp";

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
});

/*Ember.LinkView.reopen({
 "data-toggle":'dropdown',
 attributeBindings:['href','title','data-toggle']
 });*/

App.ApplicationController = Ember.Controller.extend({

});

App.ApplicationRoute = Ember.Route.extend({
});

App.Needs = [
    {id: 0, title: 'Odvoz odpadu z farmy Bertranka', desc: 'lorem ipsum', thumbsCount: 0},
    {id: 1, title: 'Posekání zahrady', desc: 'asdf asdf asd sd asdf', thumbsCount: 0},
    {id: 2, title: 'Výměna píchnutého kola', desc: 'asdf asd fasd fasdf asd asd fasdf', thumbsCount: 0},
    {id: 3, title: 'Vyvenčít poníka', desc: 'asdf asd fasd fasdf asd asd fasdf', thumbsCount: 0}
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
    },
    setupController: function (controller, model) {
        controller.thumbsUp = function (item) {
            Ember.set(item, 'thumbsCount', Ember.get(item, 'thumbsCount') + 1);
            if (item.thumbsCount >= 20) return Ember.set(item, 'thumbsClass', 'badge-info');
            else if (item.thumbsCount >= 10) return Ember.set(item, 'thumbsClass', 'badge-warning');
            else if (item.thumbsCount >= 5) return Ember.set(item, 'thumbsClass', 'badge-important');
            else if (item.thumbsCount >= 1) return Ember.set(item, 'thumbsClass', 'badge-success');
            else return Ember.set(item, 'thumbsClass', null);
        };
    }
});

App.NeedsBydateRoute = NeedsByRoute.extend({
    activate: function () {
        $(document).attr('title', 'Needs by date');
    }
});
App.NeedsBypopularityRoute = NeedsByRoute.extend({
    model: function (params) {
        return App.Needs.copy().reverse();
    },
    activate: function () {
        $(document).attr('title', 'Needs by popularity');
    }
});
// #################################

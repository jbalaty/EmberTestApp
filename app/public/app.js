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
App.name = "Hearth";

App.Router.map(function () {
    // put your routes here
    this.resource('index', { path: '/' });
    this.resource('profile', {path: '/profile' }, function () {
        //this.route('detail', {path: '/profile/:profile_id'});
    });
    this.resource('needs', {path: '/needs' }, function () {
        this.route('bydate',{path:'/newest'});
        this.route('bypopularity',{path:'/mostpopular'});
        this.route('detail',{path:'/:need_id'});
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
    {id: 0, title: 'Odvoz odpadu z farmy Bertranka',desc:'lorem ipsum'},
    {id: 1, title: 'Posekání zahrady',desc:'asdf asdf asd sd asdf'},
    {id: 2, title: 'Výměna píchnutého kola',desc:'asdf asd fasd fasdf asd asd fasdf '}
];

App.IndexRoute = Ember.Route.extend({
    model: function () {
        return App.Needs
    },
    setupController: function (controller) {
        controller.buttonCaption = 'alert';
        controller.alert = function (param) {
            alert('IndexController alert!');
            controller.set('buttonCaption', 'green');
        }
    },
    redirect: function() {
        this.transitionTo('needs.bydate');
    }
});

App.ProfileRoute = Ember.Route.extend({
    model: function () {
        return {id: 0, name: 'Roman Kukuška', birthDate: '1984-02-13'};
    }
});

App.ProfileIndexController = Ember.ObjectController.extend({
    age: function () {
        var bd = moment(this.get('birthDate'));
        return moment().diff(bd,'years');
    }.property('birthDate')
});

App.NeedsIndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('needs.bydate');
    }
});

App.NeedsIndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('needs.bydate');
    }
});

App.NeedsDetailRoute = Ember.Route.extend({
    model: function (params) {
        return App.Needs[params.need_id];
    }
});

App.NeedsBydateRoute = Ember.Route.extend({
    model: function (params) {
        return App.Needs;
    },
    renderTemplate: function() {
        this.render('needsList');
    },
    activate: function() {
        $(document).attr('title', 'Needs by date');
    }
});
App.NeedsBypopularityRoute = Ember.Route.extend({
    model: function (params) {
        return App.Needs.copy().reverse();
    },
    renderTemplate: function() {
        this.render('needsList');
    },
    activate: function() {
        $(document).attr('title', 'Needs by popularity');
    }
});
App = {};
App.Models = {};
App.Views = {};
App.Collections = {};
App.Templates = {};
App.Routers = {};
App.addTemplate = function(templateSelector){
  var template = App.Templates[templateSelector];
  if(!template){
    template = App.Templates[templateSelector] = Handlebars.compile($(templateSelector).text());
  }
  return template;
}
var theHttp;

(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.getting-started', {
        url: '/getting-started',
        views: {
          '@': {
            templateUrl: 'src/app/getting-started/getting-started.tpl.html',
            controller: 'GettingStartedCtrl as start'
          }
        }
      });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function GettingStartedCtrl($log, $state, $http, Backand, BackandService) {

  	theHttp = $http;

    var start = this;

    (function init() {
      start.username = "";
      start.password = "";
      start.appName = "";
      start.objects = null;
      start.isLoggedIn = false;
      start.objectData = "{}";
      start.results = "Not connected to Backand yet";
      loadObjects();
    }());


    start.signin = function () {
      Backand.signin(start.username, start.password, start.appName)
        .then(
        function () {
          start.results = "you are in";
          loadObjects();
        },
        function (data, status, headers, config) {
          $log.debug("authentication error", data, status, headers, config);
          start.results = data;
        }
      );
    };

    start.signout = function (){
      Backand.signout();
      $state.go('root.getting-started',{}, {reload: true});
    }

    function loadObjects() {
      BackandService.listOfObjects().then(loadObjectsSuccess, errorHandler);
    }

    function loadObjectsSuccess(list) {
      start.objects = list.data.data;
      start.results = "Objects loaded";
      start.isLoggedIn = true;
    }

    start.loadObjectData = function(){
      BackandService.objectData(start.objectSelected).then(loadObjectDataSuccess, errorHandler);
    }
    function loadObjectDataSuccess(ObjectData) {
      start.objectData = ObjectData.data.data;
    }

    function errorHandler(error, message) {
      $log.debug(message, error)
    }
  }

  angular.module('getting-started', [])
    .config(config)
    .controller('GettingStartedCtrl', ['$log', '$state', '$http', 'Backand','BackandService', GettingStartedCtrl]);
})();

var start={};

start.s3_doUpdate = function(filename, theBase64Data)
{
	start.s3update 
	var req = {
	 method: 'POST',
	 url: 'http://localhost:24681',
	 headers: {
	   'Content-Type': undefined
	 },
	 data: 
		{
		"region":"us-east-1",
		"bucket":"backand-east-1",
		"key":"AKIAI24P3PN2VNCXVCSA",
		"secret_key":"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",
		"file":filename,
		"data":theBase64Data
		}
	}	

	theHttp(req).success(function(res){
		alert('res='+res);
	}).error(function(err){
		alert('err='+err);
	});
}


start.file_changed = function(element) {
		var data = element;
     // $apply(function(scope) {
         var photofile = element.files[0];
         var reader = new FileReader();
         reader.onload = function(e) {
         	var b64 = e.currentTarget.result;
         	start.s3_doUpdate(b64);
         };
         reader.readAsDataURL(photofile);
     // });

}


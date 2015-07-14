var theHttp;

(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider, $httpProvider) {
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

start.s3_doUpdate = function(filename, filedata)
{
  console.log('update: filedata.length='+filedata.length);
	start.s3update 
	var req = {
	 method: 'POST',
	 url: 'http://localhost:7436/1/objects/action/items/1?name=s3upload&parameters=%7B%22filename%22:%22'+filename+'%22%7D',
	 headers: {
	   'Content-Type': 'application/json'
	 },
	 data: 
		{
		//"filename":filename,
    filedata
		}
	}	

	theHttp(req).success(function(res){
		console.log('res='+JSON.stringify(res));
	}).error(function(err){
		alert('err='+err);
	});
}


start.file_changed = function(element) {
		var data = element;
     // $apply(function(scope) {
         var photofile = data.files[0];
         var filename = photofile.name;
         var reader = new FileReader();
         reader.onload = function(e) {
         	var b64 = e.currentTarget.result;
          var filedata = b64;
          console.log('b64='+b64);
          //filedata = b64.substring(b64.indexOf("base64,") + 7);
          //console.log('filedata='+filedata);
          //var filedata = atob(filedata);
          //console.log('filedata='+filedata);
         	start.s3_doUpdate(filename, filedata);
         };
         reader.readAsDataURL(photofile);
     // });

}


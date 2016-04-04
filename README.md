# Angular + Cloud Endpoints API
This repo demonstrates how we can initialize an Angular app to work with Google App Engine and Cloud Endpoints.

### How to run this app
1. Run dev_appserver.py [path to this project folder]
2. Open localhost:8080 on your browser
3. Click 'Get Greetings' to execute endpoints method.

### How this was created
1. Create a new App Engine project, with these `app.yaml` configurations :
    ```
    - url: /
      static_files: templates/index.html
      upload: templates/index\.html
    - url: /_ah/spi/.*
      script: event_endpoints.APPLICATION
    - url: .*
      script: main.app
    - name: pycrypto
      version: latest
    - name: endpoints
      version: 1.0
    ```
2. Create the endpoints api file. In this example, it is `endpoints.py` which also specifies the client app's `client identifier`.
3. The client app must specify a client identifier, which is used for verifying the client app's permission to access the endpoints service. The client ID is created in the Google Cloud Console of the App Engine app.
4. The main page of the SPA is defined by `templates/index.html`, as specified in the app.yaml's configuration. Inside this document, angular.js, app.js and Google's Javascript Client Library are all loaded or initialized.
5. Once the Google Javascript Client Library is loaded, we call the `init` function, which subsequently calls the `window.initapi()` to load the endpoints api service:

    ```
    // inside index.html
    <script src="https://apis.google.com/js/client.js?onload=init"></script>

    // inside mainController.js
    function init() {
        angular.element(document).ready(function() {
            // when document is ready
            // run initapi() specified inside the angular $window.init2()
            window.initapi();
        });
    }
    ```
6. The loading of the endpoints service api is abstracted into an Angular Service, inside `cloudendpoint.js`. The endpoints service is loaded using Angular's `$q` service to return a JavaScript promise.
7. The Javascript promise returned from the `cloudendpoint.init()` is chained by a `then()`, which creates declares `$scope.backend_ready = true;`. Consequently, the *Get Greetings* button is shown inside index.html.
8. The *Get Greetings* button is handled by `$scope.getList()`, which uses the gapi.client to execute a call to the endpoints api, and returns a response to be augmented to the DOM:
    ```
    $scope.getList = function() {
        gapi.client.events.greetings.listGreeting().execute(function(resp) {
            $scope.results = resp.items;
            console.log($scope.results);
        });
    };
    ```

### Resources
- https://cloud.google.com/solutions/angularjs-cloud-endpoints-recipe-for-building-modern-web-applications
- http://anandsekar.github.io/initialize-google-appengine-and-angularjs/
- http://stackoverflow.com/questions/18403604/boot-angularjs-cloud-endpoints
- https://cloud.google.com/appengine/docs/python/endpoints/consume_js
- https://cloud.google.com/appengine/docs/python/endpoints/getstarted/clients/js/
- https://github.com/GoogleCloudPlatform/appengine-endpoints-helloendpoints-python

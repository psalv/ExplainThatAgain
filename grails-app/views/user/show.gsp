<!DOCTYPE html>
<html lang="en">

<head>

    <!--=========================================== WEBPAGE METADATA ====================================-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Explain that Again</title>

    <!-- Favicons
    ================================================== -->
    <link rel="shortcut icon" href="">
    <link rel="apple-touch-icon" sizes="57x57" href="../../assets/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="60x60" href="">
    <link rel="apple-touch-icon" sizes="72x72" href="">
    <link rel="apple-touch-icon" sizes="76x76" href="">
    <link rel="apple-touch-icon" sizes="114x114" href="../../assets/images/apple-touch-icon-retina.png">
    <link rel="apple-touch-icon" sizes="120x120" href="">
    <link rel="apple-touch-icon" sizes="144x144" href="">
    <link rel="apple-touch-icon" sizes="152x152" href="">
    <link rel="apple-touch-icon" sizes="180x180" href="">
    <link rel="icon" type="image/png" sizes="192x192" href="">
    <link rel="icon" type="image/png" sizes="32x32" href="">
    <link rel="icon" type="image/png" sizes="96x96" href="">
    <link rel="icon" type="image/png" sizes="16x16" href="">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="">
    <meta name="theme-color" content="#ffffff">

    <!--=========================================== CSS FILES ===========================================-->
    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" href="${resource(dir: 'stylesheets', file: 'bootstrap.css')}" type="text/css">

    <!-- Custom Fonts -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Raleway:300,400,700" rel="stylesheet">
    %{--<asset:stylesheet src="bundle.css"/>--}%

    <!-- Custom CSS -->
    <link rel="stylesheet" href="${resource(dir: 'stylesheets', file: 'session.css')}" type="text/css">


    <!--======================================= FILE UPLOAD SCRIPT =======================================-->
    <script type="text/javascript">

      //
      //
      //
      // Adapted from Google Picker API Docs
      //
      //
      //

      // The Browser API key obtained from the Google Developers Console.
      var developerKey = 'AIzaSyCDL5_1jZURjI89oeSDf_1LJOxpK-EfrlA';

      // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
      var clientId = "363460569785-8ktpo5pp14r8anevl1imeco4rsa4soro.apps.googleusercontent.com"

      // Scope to use to access user's documents.
      var scope = ['https://www.googleapis.com/auth/drive'];

      var pickerApiLoaded = false;
      var oauthToken;

      function newtab(url) {
        var win = window.open(url, '_blank');
        win.focus();
      }

      // Use the API Loader script to load google.picker and gapi.auth.
      function onApiLoad() {
        gapi.load('auth', {'callback': onAuthApiLoad});
        gapi.load('picker', {'callback': onPickerApiLoad});
      }

      function onAuthApiLoad() {
        window.gapi.auth.authorize(
            {
              'client_id': clientId,
              'scope': scope,
              'immediate': false
            },
            handleAuthResult);
      }

      function onPickerApiLoad() {
        pickerApiLoaded = true;
        createPicker();
      }

      function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
          oauthToken = authResult.access_token;
          createPicker();
        }
      }

      // Create and render a Picker object for picking user documents.
      function createPicker() {
        if (pickerApiLoaded && oauthToken) {
          var docsView = new google.picker.DocsView()
                .setIncludeFolders(true)
                .setMimeTypes('application/vnd.google-apps.presentation,application/pdf,application/vnd.ms-powerpoint.presentation.macroEnabled.12,text/plain')
                .setSelectFolderEnabled(true);

          var picker = new google.picker.PickerBuilder().
              addView(docsView).
              setOAuthToken(oauthToken).
              setDeveloperKey(developerKey).
              setCallback(pickerCallback).
              build();
          
          picker.setVisible(true);
        }
      }

      // A simple callback implementation.
      function pickerCallback(data) {
        var url = 'nothing';
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
          var doc = data[google.picker.Response.DOCUMENTS][0];
          url = doc[google.picker.Document.URL];
          newtab(url);
        }
      }
    </script>
</head>

<body>

    <div class="row" style="margin: 150px">
        User profile for: ${this.params.username}
        <br>
        <div id="courseField"></div>
        <br>
        <div id="sessionField"></div>
        <br>
        <a onclick="onApiLoad()">Upload a New Presentation From Google Docs (.pptx, .pdf, and Google Slides) or a Chatlog, Graph, or Analytical File (.txt)</a>
    </div>

    <div class="row text-center">
        <g:link controller="Session" action="returnToIndex">Back</g:link>
    </div>


%{--Bundles all javascripts into a single file--}%
    <asset:javascript src="bundle.js"/>

</body>

</html>
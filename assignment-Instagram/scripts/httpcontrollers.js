angular.module('http.controllers', ['basic.services'])
.controller('postCtrl', function($scope, $http) {
    $scope.data = '';
    $scope.numImages = 0;
    
    $scope.render = function(){
        var promise = $http.get('http://tiny-pizza-server.herokuapp.com/collections/Gabestagram')
        .success(function(response) {
            $scope.images = [];
            console.log(response);
            for(var i=0; i < response.length; i++)
            {
                console.log("response data: " + response[i].caption);
                if(response[i].picture && response[i].caption){
                    $scope.images.push(response[i]);   
                }
            }
            console.log("pushed array: " + $scope.images[0].caption);

        })
        .error(function(err){
            console.log(err);
        });
    }

    $scope.render();

    $scope.add = function(image, caption)
    {
        $scope.buttonText = 'Click Me';
        $scope.count = 0; 
        var validURL = false;
        var validCaption = false;
        $scope.siteError1 = false;
        $scope.siteError2 = false;
        $scope.nameError = false;

        console.log("submit button clicked");
        console.log("url: " + image + "    caption: " + caption);
        if(image)
        {
            if(image.substring(0,7) === 'http://' || image.substring(0,8) === 'https://')
            {
                $scope.validURL = true;
            }
            else{
                $scope.siteError2 = true;
                console.log("bad url");
            }
        }
        else{
                $scope.siteError1 = true;
                console.log("bad url");
        }
        
        if(caption)
            $scope.validCaption = true;
        else
            $scope.nameError = true;
        
        if($scope.validURL === true && $scope.validCaption === true){
//            console.log("Posting image and caption: " + caption);
            $http.post('http://tiny-pizza-server.herokuapp.com/collections/Gabestagram', 
                   { picture: image, caption: caption }); 
            $scope.render();

//                       { picture: image, caption: caption, likes: count }); 

        }
            
//        $scope.click = function(pic){
//            console.log('Incrementing count' );
//            $scope.count++;
//            $scope.buttonText = $scope.count + ' Likes';
//            if($scope.count === 1)
//            {
//                 $scope.buttonText = $scope.count + ' Like';
//            }
//            console.log("pic: " + pic);
//            console.log("likes: " + pic.likes);
////            $http.put('http://tiny-pizza-server.herokuapp.com/collections/Gabestagram', 
////                       { picture: image, caption: caption, likes: count }); 
//        }
    };   
});
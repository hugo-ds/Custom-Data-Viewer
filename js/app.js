var app = angular.module('readcustomdata', []);

app.controller('variables', function($scope) {
    $scope.user_input = '';
    $scope.searchKeyword   = '';
    $scope.data = [];
    
    // transform the user input data to array.
    $scope.split = function(content) {
        $scope.data = [];
        
        let lines = content.split(";");
        
        let tmp1 = [];
        let tmp2 = [];
        
        // data format: S:IncludeInSla=True => [[S, IncludeInSla, True], ... ]
        for(const line of lines){
            tmp1 = line.split('=');
            tmp2 = tmp1[0].split(':');
            
            $scope.data.push([tmp2[0], tmp2[1], tmp1[1]]);
        }
        
        // console.log($scope.data);
        // console.log("Splitted\n");
    };
});

// highlight the searched keyword.
app.filter('highlight', function($sce) {
    return function(text, phrase) {
        if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="highlighted">$1</span>')

        return $sce.trustAsHtml(text);
    };
});

// push enter after input data.
app.directive('enterPressed', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.enterPressed);
                });

                event.preventDefault();
            }
        });
    };
});

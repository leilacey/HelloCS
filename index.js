(function() {
    "use strict";
    //This function sets up a variable to streamline accessing elements.
    var $ = function(id) { 
        return document.getElementById(id); 
    };
    
    var qsa = function(sel) { return document.querySelectorAll(sel); };
    
    window.onload = function() {
        $("quiz").onclick = postParam;
        $("skipQuiz").onclick = postParam;
        
    }
    
    function postParam() {
        var ajaxPromise = new AjaxGetPromise("quiz.php?mode=" + this.id);
        ajaxPromise
            .then(function() {window.location.href ="quiz.html"} )
            .catch(function(errorMessage) {alert(errorMessage)} )
        ;
    }
})();
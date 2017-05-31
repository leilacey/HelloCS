//This function encapsulates the functions for the rest of the assignment.
(function() {
    "use strict";
    //This function sets up a variable to streamline accessing elements.
    var $ = function(id) { 
        return document.getElementById(id); 
    };
    
    var qsa = function(sel) { return document.querySelectorAll(sel); };
    
    var interestCounter;
    
    //This function triggers the load of all the books and sets a click handler
    // for the home button.
    window.onload = function() {
        interestCounter = {Art: 0, Automotive: 0, Business: 0, Fashion: 0, Film: 0, Forensics: 0, 
            "Library Science": 0, Marketing: 0, Math: 0, Medical: 0, Military: 0, Music: 0, 
            Science: 0, Space: 0, Sports: 0,  "Video Games": 0};
        getQuiz();
        addInterests();
        $("submit").onclick = getGreatest;
        $("results").hidden = true;
        $("allInterests").hidden = true;
    };
    
    function getQuiz() {
        var quizPromise = new AjaxGetPromise("quiz.php?mode=showMode");
        quizPromise
            .then(function(response){
                if (response == "true") {
                    getQuestions();
                } else {
                    getAll();
                }
            })
            .catch(function(errorMessage){alert(errorMessage);});
    }
    //This function makes a promuse to get all of the books for the homepage
    function getQuestions() {
        var quizPromise = new AjaxGetPromise("quiz.php?mode=questions");
        quizPromise
            .then(function(response){showQuestions(JSON.parse(response))})
            .catch(function(errorMessage){alert(errorMessage);});
    }
    
    function addInterests() {
        var interests = Object.keys(interestCounter);
        for (var i = 0; i < interests.length; i++) {
            var interest = document.createElement("div");
            interest.classList = "quizButton";
            interest.innerHTML = interests[i];
            interest.onclick = getInterestPromise;
            $("allInterests").appendChild(interest);
        }
    }
    
    //This function uses the book reviews to add reviews to the page.
    function showQuestions(questions) {
        $("quiz").innerHTML = "";
        for (var i = 0; i < questions.length; i++) {
            var outerDiv = document.createElement("div");
            outerDiv.classList.add("outerDiv");
            var question = document.createElement("h3");
            question.innerHTML = questions[i][0];
            outerDiv.appendChild(question);
            for (var j = 1; j < 5; j++) {
                var answer = document.createElement("div");
                var buttonText = questions[i][j].split(":");
                answer.innerHTML = buttonText[0];
                answer.classList = ("q" + i + " quizButton " + buttonText[1]);
                answer.onclick = incrementClass;
                outerDiv.appendChild(answer);
            }
            $("quiz").appendChild(outerDiv);
        }
    }

    function incrementClass() {
        var str = "" + this.classList;
        var classes = str.split(" quizButton ");
        var buttons = qsa("." + classes[0]);
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.add("disabled");
            buttons[i].onclick = function() {
                return false;
            };
        }
        interestCounter[classes[1].trim()]++;
    }
    
    function getGreatest() {
        $("quiz").hidden = true;
        $("results").hidden = false;
        $("allInterests").hidden = false;
        $("submit").style.visibility = "hidden";
        $("title").innerHTML = "Here is the interest you scored highest in!";
        var interests = Object.keys(interestCounter);
        var greatestInterest = "Art";
        for (var i = 0; i < interests.length; i++) {
            if (interestCounter[greatestInterest] < interestCounter[interests[i]]) {
                greatestInterest = interests[i];
            }
        }
        getResults(greatestInterest);
    }
    
    function getAll() {
        $("quiz").hidden = true;
        $("results").hidden = false;
        $("allInterests").hidden = false;
        $("submit").style.visibility = "hidden";
        $("title").innerHTML = "CS Related Interests";
        getResults("Art");
    }
    
    function getInterestPromise() {
        $("title").innerHTML = "CS Related Interests"
        getResults(this.innerHTML);
    }
    
    function getResults(interest) {
        var resultsPromise = new AjaxGetPromise("quiz.php?mode=interest&interest=" + interest);
        resultsPromise
            .then(function(response){showInterest(response)})
            .catch(function(errorMessage){alert(errorMessage);});
    }
    
    function showInterest(response) {
        $("results").innerHTML = response;
    }
})();
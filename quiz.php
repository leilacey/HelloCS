<?php
    error_reporting(E_ALL);
    
    $mode = $_GET["mode"];
    session_start();
    
    if ($mode == "questions") {
        getQuestions();
    } else if ($mode == "interest") {
        $interest = $_GET["interest"];
        showInterest($interest);
    } else if ($mode == "quiz") {
        $_SESSION["quizMode"] = "true";
    } else if ($mode == "skipQuiz") {
        $_SESSION["quizMode"] = "false";
    } else if ($mode == "showMode") {
        echo $_SESSION["quizMode"];
    }
    
    function getQuestions() {
        $questions = glob("questions/q*.txt");
        $questionsoutput = array();
        foreach ($questions as $question) {
            $newquestion = file("$question");
            array_push($questionsoutput, $newquestion);
        }
        echo json_encode($questionsoutput); 
    }
    
    function showInterest($interest) {
        echo file_get_contents("interests/$interest.txt");
    }
?>
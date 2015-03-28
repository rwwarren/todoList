<?php

if(isset($_GET['type']) && $_GET['type'] === "getAll"){
  getAll();
  exit();
} else if(isset($_GET['type']) && $_GET['type'] === "getIncomplete"){
  getIncomplete();

  exit();
} else if(isset($_GET['type']) && $_GET['type'] === "create"){
  createTask();

  exit();
} else if(isset($_GET['type']) && $_GET['type'] === "changeStatus"){
  changeStatus();

  exit();
} else {
  echo "error";
  exit();
}

function getAll(){
  //should be post
      $user = $_GET['user'];
      $mysqli = new mysqli("localhost", "write", "PASSWORD", "TasksDB");
      //$stmt = $this->mysqli->prepare("Select ID from Users where Username = ? and AuthyID = ? and IsActive = 1 LIMIT 1");
      //incomplete status then soonest due date
      $stmt = $mysqli->prepare("SELECT user, status, description, due_date from TodoList where user = ? ORDER BY status DESC, DATE(due_date) ASC");
      $stmt->bind_param('s', $user);
      $stmt->execute();
      $stmt->bind_result($user, $status, $desc, $due);
      //$results = $stmt->fetch();
      //$stmt->free_result();
      //$stmt->close();
      //echo "results: <br>";
      //print_r($results);
      header("HTTP/1.0 200 Success");
      header('Content-Type: application/json');
      $result = array();
      $i = 0;
      while ($stmt->fetch()) {
        $result[$i] = array("user" => $user, "status" => $status, "description" => $desc, "due_date" => $due);
        //$result[$i] = $username;
        $i++;
      }
      //$results = $stmt->fetch();
      $stmt->free_result();
      $stmt->close();
      echo json_encode($result, true);
      //echo json_encode(array("user" => $user, "status" => $status, "description" => $desc, "due_date" => $due), true);

}

function getIncomplete(){
  //should be post
      $user = $_GET['user'];
      $mysqli = new mysqli("localhost", "write", "PASSWORD", "TasksDB");
      //$stmt = $this->mysqli->prepare("Select ID from Users where Username = ? and AuthyID = ? and IsActive = 1 LIMIT 1");
      $stmt = $mysqli->prepare("SELECT user, status, description, due_date from TodoList where user = ? and status = 'Incomplete' ORDER BY DATE(due_date) ASC");
      //$stmt = $mysqli->prepare("SELECT user, status, description, due_date from TodoList where user = ? and status = 'Incomplete' ORDER BY due_date DESC");
      $stmt->bind_param('s', $user);
      $stmt->execute();
      $stmt->bind_result($user, $status, $desc, $due);
      //$results = $stmt->fetch();
      //$stmt->free_result();
      //$stmt->close();
      //echo "results: <br>";
      //print_r($results);
      header("HTTP/1.0 200 Success");
      header('Content-Type: application/json');
      $result = array();
      $i = 0;
      while ($stmt->fetch()) {
        $result[$i] = array("user" => $user, "status" => $status, "description" => $desc, "due_date" => $due);
        //$result[$i] = $username;
        $i++;
      }
      //$results = $stmt->fetch();
      $stmt->free_result();
      $stmt->close();
      echo json_encode($result, true);
      //echo json_encode(array("user" => $user, "status" => $status, "description" => $desc, "due_date" => $due), true);

}

function createTask(){
      $user = $_GET['user'];
      $status = isset($_GET['status']) ? $_GET['status'] : "Incomplete";
      $desc = isset($_GET['description']) ? $_GET['description'] : "Testing";
      $date = date('Y-m-d H:i:s', strtotime('+5 days'));
      //$date = date('Y-m-d', strtotime('+5 days'));
      $due = isset($_GET['due']) ? $_GET['due'] : $date;
      $mysqli = new mysqli("localhost", "write", "PASSWORD", "TasksDB");
      //$stmt = $this->mysqli->prepare("Select ID from Users where Username = ? and AuthyID = ? and IsActive = 1 LIMIT 1");
      //$stmt = $mysqli->prepare("INSERT INTO TodoList VALUES(?, ?, ?, ?)");
      //$stmt->bind_param('ssbb', $user, $status, $desc, $due);
      //$stmt = $mysqli->prepare("INSERT INTO TodoList VALUES(DEFAULT, ?, '', '', DEFAULT)");
      //$stmt->bind_param('s', $user);
      $stmt = $mysqli->prepare("INSERT INTO TodoList VALUES(DEFAULT, ?, ?, ?, ?)");
      $stmt->bind_param('ssss', $user, $status, $desc, $due);
      //$stmt->bind_param('ssbs', $user, $status, $desc, $due);
      $stmt->execute();
      //$stmt->bind_result($user, $status, $desc, $due);
      $results = $stmt->fetch();
      $stmt->free_result();
      $stmt->close();
      echo "results: <br>";
      print_r($results);

}

function changeStatus(){
  //should be post
      $user = $_GET['user'];
      $mysqli = new mysqli("localhost", "write", "PASSWORD", "TasksDB");
      //$stmt = $this->mysqli->prepare("Select ID from Users where Username = ? and AuthyID = ? and IsActive = 1 LIMIT 1");
      $stmt = $mysqli->prepare("UPDATE TodoList SET status = 'Complete' where id = ?");
      $stmt->bind_param('s', $user);
      $stmt->execute();
      //$stmt->bind_result($user, $status, $desc, $due);
      //$results = $stmt->fetch();
      //$stmt->free_result();
      //$stmt->close();
      //echo "results: <br>";
      //print_r($results);
      header("HTTP/1.0 200 Success");
      header('Content-Type: application/json');
      //$result = array();
      //$i = 0;
      //while ($stmt->fetch()) {
      //  $result[$i] = array("user" => $user, "status" => $status, "description" => $desc, "due_date" => $due);
      //  //$result[$i] = $username;
      //  $i++;
      //}
      ////$results = $stmt->fetch();
      $stmt->free_result();
      $stmt->close();
      echo "done";
      //echo json_encode($result, true);
      //echo json_encode(array("user" => $user, "status" => $status, "description" => $desc, "due_date" => $due), true);

}


?>

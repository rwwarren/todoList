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
      $stmt = $mysqli->prepare("SELECT id, user, status, description, DATE_FORMAT(due_date, \"%M %e, %Y\") from TodoList where user = ? ORDER BY status DESC, DATE(due_date) ASC");
      $stmt->bind_param('s', $user);
      $stmt->execute();
      $stmt->bind_result($id, $user, $status, $desc, $due);
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
        $result[$i] = array("id" => $id, "user" => $user, "status" => $status, "description" => $desc, "due_date" => $due);
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
      $stmt = $mysqli->prepare("SELECT id, user, status, description, DATE_FORMAT(due_date, \"%M %e, %Y\") from TodoList where user = ? and status = 'Incomplete' ORDER BY DATE(due_date) ASC");
      //$stmt = $mysqli->prepare("SELECT user, status, description, due_date from TodoList where user = ? and status = 'Incomplete' ORDER BY due_date DESC");
      $stmt->bind_param('s', $user);
      $stmt->execute();
      $stmt->bind_result($id, $user, $status, $desc, $due);
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
        $result[$i] = array("id" => $id, "user" => $user, "status" => $status, "description" => $desc, "due_date" => $due);
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
      //post
      $user = $_GET['user'];
      $status = isset($_POST['status']) ? $_POST['status'] : "Incomplete";
      $desc = isset($_POST['description']) ? $_POST['description'] : "Testing";
      $date = date('Y-m-d', strtotime('+5 days'));
      $due = isset($_POST['date']) && strlen($_POST['date'] > 1) ? date('Y-m-d', strtotime($_POST['date'])) : date('Y-m-d', strtotime('+5 days'));
      //$due = isset($_GET['due']) ? $_GET['due'] : $date;
      $mysqli = new mysqli("localhost", "write", "PASSWORD", "TasksDB");
      $stmt = $mysqli->prepare("INSERT INTO TodoList VALUES(DEFAULT, ?, ?, ?, ?)");
      $stmt->bind_param('ssss', $user, $status, $desc, $due);
      $stmt->execute();
      $results = $stmt->fetch();
      $stmt->free_result();
      $stmt->close();
      $result = array("Results" => array("Status" => "Creation Complete", "Username" => $user, "Task Status" => $status, "Description" => $desc, "Due Date" => $due));
      header("HTTP/1.0 200 Success");
      header('Content-Type: application/json');
      echo json_encode($result, true);

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
      //echo "done";
      header("HTTP/1.0 200 Success");
      header('Content-Type: application/json');
      $result = array("Status" => "Done", "Task" => "asdf????", "Task Status" => "Complete>??");
      echo json_encode($result, true);
      //echo json_encode(array("user" => $user, "status" => $status, "description" => $desc, "due_date" => $due), true);

}


?>

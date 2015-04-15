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
} else if(isset($_GET['type']) && $_GET['type'] === "edit"){
  edit();
  exit();
} else {
  echo "error";
  exit();
}

function getAll(){
      $user = $_GET['user'];
      if(strlen($user) < 1) {
        exit();
      }
      $mysqli = new mysqli("localhost", "write", "PASSWORD", "TasksDB");
      $stmt = $mysqli->prepare("SELECT id, user, status, description, DATE_FORMAT(due_date, \"%M %e, %Y\") from TodoList where user = ? ORDER BY status DESC, DATE(due_date) ASC");
      $stmt->bind_param('s', $user);
      $stmt->execute();
      $stmt->bind_result($id, $user, $status, $desc, $due);
      header("HTTP/1.0 200 Success");
      header('Content-Type: application/json');
      $result = array();
      $i = 0;
      while ($stmt->fetch()) {
        $result[$i] = array("id" => $id, "user" => $user, "status" => $status, "description" => $desc, "due_date" => $due);
        $i++;
      }
      $stmt->free_result();
      $stmt->close();
      echo json_encode($result, true);
}

function getIncomplete(){
      $user = $_GET['user'];
      if(strlen($user) < 1) {
        exit();
      }
      $mysqli = new mysqli("localhost", "write", "PASSWORD", "TasksDB");
      $stmt = $mysqli->prepare("SELECT id, user, status, description, DATE_FORMAT(due_date, \"%M %e, %Y\") from TodoList where user = ? and status = 'Incomplete' ORDER BY DATE(due_date) ASC");
      $stmt->bind_param('s', $user);
      $stmt->execute();
      $stmt->bind_result($id, $user, $status, $desc, $due);
      header("HTTP/1.0 200 Success");
      header('Content-Type: application/json');
      $result = array();
      $i = 0;
      while ($stmt->fetch()) {
        $result[$i] = array("id" => $id, "user" => $user, "status" => $status, "description" => $desc, "due_date" => $due);
        $i++;
      }
      $stmt->free_result();
      $stmt->close();
      echo json_encode($result, true);
}

function createTask(){
      $user = $_GET['user'];
      $desc = isset($_POST['description']) && strlen($_POST['description']) > 0 ? $_POST['description'] : "";
      if(strlen($user) < 1 || strlen($desc) < 1) {
        exit();
      }
      $status = isset($_POST['status']) && strlen($_POST['status']) > 0 ? $_POST['status'] : "Incomplete";
      $date = date('Y-m-d', strtotime('+5 days'));
      $due = isset($_POST['date']) && strlen($_POST['date']) > 0 ? date('Y-m-d', strtotime($_POST['date'])) : date('Y-m-d', strtotime('+5 days'));
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

function edit(){
      $user = $_GET['user'];
      $id = isset($_POST['id']) && strlen($_POST['id']) > 0 ? $_POST['id'] : "";
      if(strlen($user) < 1 || strlen($id) < 1) {
        exit();
      }
      $mysqli = new mysqli("localhost", "write", "PASSWORD", "TasksDB");
      $stmt = $mysqli->prepare("SELECT status, description, due_date FROM TodoList where user = ? and id = ?");
      $stmt->bind_param('ss', $user, $id);
      $stmt->execute();
      $stmt->bind_result($oldstatus, $olddesc, $olddue);
      $stmt->fetch();
      $stmt->free_result();
      $stmt->close();
      $status = isset($_POST['status']) && strlen($_POST['status']) > 0 ? $_POST['status'] : $oldstatus;
      $due = isset($_POST['due_date']) && strlen($_POST['due_date']) > 0 ? date('Y-m-d', strtotime($_POST['due_date'])) : date('Y-m-d', strtotime($olddue));
      $description = isset($_POST['description']) && strlen($_POST['description']) > 0 ? $_POST['description'] : $olddesc;
      $result = array("Complete" => "Successful", "Task" => $id, "Status" => $status, "Description" => $description, "Due" => $due);
      $stmt2 = $mysqli->prepare("UPDATE TodoList SET status = ?, description = ?, due_date = ? where user = ? and id = ?");
      $stmt2->bind_param('sssss', $status, $description, $due, $user, $id);
      $stmt2->execute();
      header("HTTP/1.0 200 Success");
      header('Content-Type: application/json');
      $stmt2->free_result();
      $stmt2->close();
      header("HTTP/1.0 200 Success");
      header('Content-Type: application/json');
      $result = array("Complete" => "Successful", "Task" => $id, "Status" => $status, "Description" => $description, "Due Date" => $due);
      echo json_encode($result, true);
}


?>

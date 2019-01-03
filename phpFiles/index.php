<?php    
    $user = null;
    $pass = null;
    if (sizeof($_POST) > 1){
        if($_POST['username'] != null)
            $user = $_POST['username'];
        if($_POST['password'] != null)
            $pass = $_POST['password'];        
  }
if ($user != null && $pass != null){
try {
    $pdo = new PDO('mysql:host=localhost;dbname=people;port=8888;', 'root', 'root');
    $strin = "SELECT pass from users WHERE uid='".$user."'";
    $val = $pdo->query($strin);

    $pas = '';
    while($row = $val->fetch(PDO::FETCH_ASSOC))
        $pas = $row['pass'];
    if ($pass == $pas){
      header("Location:first.html");
      exit;
    }
} catch (PDOException $e){
    exit("Database error.");
}
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css">
    <script src="main.js"></script>
    <style>
    .boom{
        margin-top: 10%;
    }
    </style>
</head>
<body class="blue lighten-5">
<div class="row boom center-align">
    <h3>Please log in</h3>
    <form class="col s12" method="post">
      <div class="row">
        <div class="input-field col s12">
          <input name="username" type="text" class="validate">
          <label for="username" class="active">Username</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input name="password" type="password" class="validate">
          <label for="password" class="active">Password</label>
        </div>
      </div>
        <div class="row">
      <div class="left-align col s6">
        <a href="signup.php" class="waves-effect waves-light btn">Sign Up</a>
      </div>
      <div class="right-align col s6">
      <input type="submit" value="Submit" class="btn waves-effect waves-light">
      </div>
      </div>
      <div class="row">
    </form>
  </div>
        
</body>
</html>

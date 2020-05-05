<!DOCTYPE html>
<html>
<head>
	<title>Login Page</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
	<h1>The Music Destination To All Music Lovers</h1>
	<div id="back">
		<div id="inputs">
			<form id="login" action="checks/check_login.php" method="POST">
				<h3 class="style_h3">Login to your Account</h3>
				<p class="style_p">Username:<input type="text" name="loginusername" placeholder="Enter your username" required /></p>
				<p class="style_p">Password:<input type="password" name="loginpassword" placeholder="Enter your password" required /></p>
				<input id="special" type="submit" name="Login" value="Log In" />
			</form>
			<p class="style_a"><a href="register.php">Don't have a account!Register Here</a></p>
		</div>
	</div>
</body>
</html>
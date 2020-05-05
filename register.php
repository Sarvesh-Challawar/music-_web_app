<!DOCTYPE html>
<html>
<head>
	<title>Register Here</title>
	<link rel="stylesheet" type="text/css" href="css/register.css">
</head>
<body>
	<h1>The Music Destination To All Music Lovers</h1>
	<div id="back">
		<div id="inputs">
			<form id="register" action="checks/check_register.php" method="POST">
				<h3 class="style_h3">Create your Account</h3>
				<p class="style_p">Username:<input type="text" name="username" placeholder="Enter your username" required /></p>
				<p class="style_p">FirstName:<input type="text" name="firstname" placeholder="Enter your FirstName" required /></p>
				<p class="style_p">LastName:<input type="text" name="lastname" placeholder="Enter your LastName" required /></p>
				<p class="style_p">E-Mail:<input type="email" name="email" placeholder="Enter your E-Mail" required /></p>
				<p class="style_p">Password:<input type="password" name="password" placeholder="Enter your password" required /></p>
				<p class="style_p">Confirm Password:<input type="password" name="confirmpassword" placeholder="Re-Enter your password" required /></p>
				<input id="special" type="submit" name="registerme" value="Register" />
			</form>
		</div>
	</div>
</body>
</html>
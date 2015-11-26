<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
	<meta charset="UTF-8">
		<%
			pageContext.setAttribute("webRootPath", pageContext
					.getServletContext().getContextPath());
		%>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="icon" href="/Demo/resource/css/img/gky.ico" type="image/x-icon"/>
		<link rel="shortcut icon" href="/Demo/resource/css/img/gky.ico" type="image/x-icon"/> 
		<link rel="stylesheet" href="${ webRootPath}/resource/css/lightbox.css" /> 
		<link rel="stylesheet" href="${ webRootPath}/resource/css/bootstrap-select.css" />
		<link rel="stylesheet" href="${ webRootPath}/resource/css/bootstrap.min.css" />
		<link rel="stylesheet" href="${ webRootPath}/resource/css/wkmanager.css" />
		<link rel="stylesheet" href="${ webRootPath}/resource/css/jqpagination.css" />
		<style type="text/css">
 .row {
	/* margin-right: -15px;
	margin-left: -15px; */
	position: relative;
} 
		
#left {
	margin-left: 5px;
	margin-right: 5px; 
	border: 1px solid #dddddd;
	padding-bottom: 10px; 
	padding-right: 5px; 
	width : 158px;
	background: white;
	border-radius: 5px;
}

#right {
	border: 1px solid #dddddd;
	border-radius: 5px;
	position: absolute;
	left: 173px;
 	/* overflow-x: auto; */
}

#add-manager-form .alert{
	padding: 6px;
}
</style>
		<title>广科掌上通</title>
		<script src="${ webRootPath}/resource/js/underscore-1.5.2.min.js"></script>
		<script src="${ webRootPath}/resource/js/jquery-1.10.2.js"></script>
		<script src="${ webRootPath}/resource/js/bootstrap.min.js"></script>
		<script src="${ webRootPath}/resource/js/frame.js"></script>
		<script src="${ webRootPath}/resource/js/jquery.jqpagination.js"></script>	
		<script src="${ webRootPath}/resource/js/gky/gky01.js"></script>
		<script src="${ webRootPath}/resource/js/util.js"></script>
		<script src="${ webRootPath}/resource/js/date/WdatePicker.js"></script>
		<script src="${ webRootPath}/resource/js/handlebars-v1.3.0.js"></script>
		<script src="${ webRootPath}/resource/js/jquery.tablesorter.min.js"></script>
		<script src="${ webRootPath}/resource/js/lightbox.min.js"></script>
		<script src="${ webRootPath}/resource/js/bootstrap-select.js"></script>
		<script type="text/javascript">
			var webRootPath = '${ webRootPath}';
		</script>
		<link rel="stylesheet" href="${ webRootPath}/resource/css/tablesorter/style.css" />
		
		
<script>
	
	$(document).ready(function() {
		$.get('getStudentList.do', function(data) {
			$('#app-main').html(data);
			$('#h1').addClass('active');
		});
		 $(".viewlink").bind("click", function() {
			$("#left").find("li").removeClass('active');
			var url = $(this).attr("url");
			$.get(url, function(data) {
				$('#app-main').html(data);
			});
			$(this).parent("li").addClass('active');
		});
	});
</script>
	</head>
	<body class="mwrapper col-xs-12" style="overflow-y:scroll;">
		<header class="app-header row">
			学生成绩管理
		</header>
	<div class="container-fluid">
			<div class="row" id="ierow">
				<div class="col-xs-1" id="left">
					<ul class="nav nav-pills nav-stacked ">
						<li class="role_manager_and_account">
						<h4>
							学生管理
						</h4>
						</li>
						<li id="h1">
							<a class="viewlink" url="getStudentList.do" href="javascript:void(0);">学生用户信息</a>
						</li>
					</ul>
				</div>
				<div class="col-xs-10 " id="right">
					<div class="app-title">
						<h4>
						</h4>
					</div>
					<div class="app-main table-responsive" id="app-main">
						</div>
					</div>
				</div>
			</div>
		<footer class="app-footer row">
		</footer>
	</body>
</html>

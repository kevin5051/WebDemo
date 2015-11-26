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
		<!--[if lt IE 9]>
　　　　		<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
　		　<![endif]-->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
		<![endif]-->
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
		<script type="text/javascript">
	(function() {
		if (parseInt(document.documentMode) < 9) {
			var style = document.createElement('link');
			style.rel = 'stylesheet';
			style.href = '${ webRootPath}/s/css/ie.css';
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(style);
		}
	})();
</script>
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
		<link rel="stylesheet" href="${ webRootPath}/resource/css/fullsize.css" />
		<script src="${ webRootPath}/resource/js/jquery.fullsize.js"></script>
		<script src="${ webRootPath}/resource/js/ajaxfileupload.js"></script>
		<script src="${ webRootPath}/resource/js/jwplayer.js"></script>
		<script src="${ webRootPath}/resource/js/jquery.blockUI.js"></script>
		
		<script src="${ webRootPath}/resource/js/file/crd.attachment.js"></script>
		<script src="${ webRootPath}/resource/js/jsrender.min.js"></script>
		<script src="${ webRootPath}/resource/js/DateEx.js"></script>
		<script src="${ webRootPath}/resource/js/crd.jsrender.ext.js"></script>	
		<script src="${ webRootPath}/resource/js/jquery.form.min.js"></script>
		
<script>
	function timedCount() {
		$.get("queryUnReadMaintain.do", function(data) {
		$('.maintain').html(data);
		if (data == 0)
			$('.maintain').html("");
		});
		$.get("queryUnReadSuggest.do", function(data) {
			$('.suggest').html(data);
		if (data == 0)
			$('.suggest').html("");
		});
		t = setTimeout("timedCount()", 10000);
	};
	
	$(document).ready(function() {
		 //timedCount();
		 var account = $("#__manager_account__").text();
		 if(account == ""){
			 window.location.href = "logout.do";
			 return ;
		 }
		 var level = $("#__manager_level__").val();
		 var role = $("#__manager_role__").val();
		 CRD.wkpm.initShowRole(level,role);
		 $(".viewlink").bind("click", function() {
				$("#left").find("li").removeClass('active');
				var url = $(this).attr("url");
				if(url == 'userList.do'){
					var role = $(this).attr("data-role");
					$.get(url,{
						role : role
					}, function(data) {
						$('#app-main').html(data);
					});
				}else{
					$.get(url, function(data) {
						$('#app-main').html(data);
					});
				}
				$(this).parent("li").addClass('active');
		});
		 
		$("#loginout").bind("click", function() {
			if (confirm("您确认要注销吗？")) {
				window.location.href = "logout.do";
			}
		});
		
		CRD.wkpm.initRole(level,role);
	});
</script>
	</head>
	<body class="mwrapper col-xs-12" style="overflow-y:scroll;">
		<header class="app-header row">
			<button type="button" id="loginout" class="btn btn-danger pull-right">注销</button>
			<input type="hidden" id="__manager_level__" value="${manager.level }">
			<input type="hidden" id="__manager_role__" value="${manager.role }">
			<h4 class="text-right" style="margin-right: 80px;">&emsp; <a id="__manager_account__" title="修改密码" href="javascript:gky.updatePassword(this);">${manager.account }</a></h4>
		</header>
	<div class="container-fluid">
			<div class="row" id="ierow">
				<div class="col-xs-1" id="left">
					<ul class="nav nav-pills nav-stacked ">
						<li class="role_manager_and_account">
						<h4>
							用户管理
						</h4>
						</li>
						<li id="h2" class="role_account">
							<a class="viewlink" url="userList.do" data-role="0" href="javascript:void(0);">学生用户信息</a>
						</li>
						<li id="h3" class="role_account">
							<a class="viewlink" url="students.do" href="javascript:void(0);">学生信息</a>
						</li>
						<li id="h_1_3" class="role_account">
							<a class="viewlink" url="userList.do" data-role="1" href="javascript:void(0);">教工用户信息</a>
						</li>
						<li id="h_1_4" class="role_account">
							<a class="viewlink" url="teachers.do" href="javascript:void(0);">教工信息</a>
						</li>
						<li id="h1" class="role_manager">
							<a class="viewlink" url="managerList.do" href="javascript:void(0);">管理员管理</a>
						</li>
						<li id="h_excel_import" class="role_account">
							<a class="viewlink" url="import.jsp" href="javascript:void(0);">信息导入</a>
						</li>
						<li class="role_property_and_school">
							<h4>
								校园服务
							</h4>
						</li>
						<!-- <li id="h66" class="role_property">
							<a class="viewlink" url="maintain.do" href="javascript:void(0);">报修管理<span class="badge pull-right maintain"></span></a>
						</li> -->
						<li id="h17" class="role_property">
						<a class="viewlink" url="suggest.do" href="javascript:void(0);">投诉建议<span class="badge pull-right suggest"></span></a>
						</li>
						<li id="h6" class="role_property">
							<a class="viewlink" url="pub_no.do"  href="javascript:void(0);">公告</a>
						</li>
						<li id="h27" class="role_property">
							<a class="viewlink" url="pri_no.do" href="javascript:void(0);">私人通知</a>
						</li>
						<li id="h14" class="role_school">
							<a class="viewlink" url="postList.do" href="javascript:void(0);">校园论坛</a>
						</li>
						<li id="h13" class="role_property">
							<a class="viewlink" url="postTypeList.do" href="javascript:void(0);">板块管理</a>
						</li>
						
						<li class="role_repair"><h4>故障报修</h4></li>
						<li id="h_repair_one" class="role_repair">
							<a class="viewlink" url="queryRepairOrders.do" href="javascript:void(0);">报修单管理</a>
						</li>
						<li id="h_repair_two" class="role_repair">
							<a class="viewlink" url="queryServiceUsers.do" href="javascript:void(0);">维修人员管理</a>
						</li>
						<li id="h_repair_three" class="role_repair">
							<a class="viewlink" url="queryOrderReasons.do" href="javascript:void(0);">报修设置</a>
						</li>
						
						<li class="role_pay"><h4>充值记录</h4></li>
						<li id="h_4_1" class="role_pay">
							<a class="viewlink" url="queryRechargeList.do" href="javascript:void(0);">充值记录</a>
						</li>
						
						<li class="role_other"><h4>其它设置</h4>
						</li>
						<li id="h9" class="role_other">
							<a class="viewlink" url="adList.do" href="javascript:void(0);">首页广告</a>  
						</li>
						<li class="role_feedback"><h4>意见反馈</h4>
						</li>
						<li id="h_feedback" class="role_feedback">
							<a class="viewlink" url="queryFeedbacks.do" href="javascript:void(0);">用户反馈</a>  
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

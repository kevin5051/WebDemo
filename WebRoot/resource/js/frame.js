(function(){
	function forbidBackSpace(e) {  
        var ev = e || window.event; //获取event对象   
        var obj = ev.target || ev.srcElement; //获取事件源   
        var t = obj.type || obj.getAttribute('type'); //获取事件源类型   
        var c = obj.getAttribute('data-code'); //获取事件源类型   
        //获取作为判断条件的事件类型   
        var vReadOnly = obj.readOnly;  
        var vDisabled = obj.disabled;  
        //处理undefined值情况   
        vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;  
        vDisabled = (vDisabled == undefined) ? true : vDisabled;  
        //当敲Backspace键时，事件源类型为密码或单行、多行文本的，   
        //并且readOnly属性为true或disabled属性为true的，则退格键失效   
        var flag1 = ev.keyCode == 8 && (t == "password" || (t == "text") || t == "textarea") && (vReadOnly == true || vDisabled == true);  
        //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效   
        var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";  
        
        var flag3 = ev.keyCode == 13 && (t == "password" || (t == "text" && c == null) || t == "textarea");  
        //判断   
        if (flag2 || flag1 || flag3) return false;  
    }  
    //禁止后退键 作用于Firefox、Opera  
    document.onkeypress = forbidBackSpace;  
    //禁止后退键  作用于IE、Chrome  
    document.onkeydown = forbidBackSpace;  
})();

;
CRD = (typeof(CRD) == "undefined") ? {} : CRD;
CRD.wkpm = (function(){
	//var wkpm = {};
	var basePath = "/GKYManage/";
	var wkpmUrl = {
			loadJsrenderURL: basePath + "jsrender/excel/"	
	};
	var renderHtml = "";
	var excelId = "app-main";
	var RoleAccessValue = {
			ACCOUNT : 1,
			MANAGER : 2,
			PROPERTY : 4,
			BILL : 8,
			OTHER : 16,
			REPAIR : 32,
			SCHOOL : 64
	};
	
	var wkpm = {
			type: {
				STUDENT: 1,
				TEACHER: 2,
				ALL: 3,
			},
			role: {
				STUDENT: 0,
				TEACHER: 1,
			},
			manager : {
				role : {
					COMMON : "COMMON",
					SUPER : "SUPER"
				}
			}
		};
	
	
	var phoneReg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
	var nameReg = new RegExp("^[a-zA-Z][a-zA-Z0-9_]{5,31}$");//账号正则表达式
	var emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; //邮箱正则表达式
	
	wkpm.initRole = function(level,role){
		var account = (level & RoleAccessValue.ACCOUNT) <= 0;
		var manager = (level & RoleAccessValue.MANAGER) <= 0;
		var property = (level & RoleAccessValue.PROPERTY) <= 0;
		var bill = (level & RoleAccessValue.BILL) <= 0;
		var other = (level & RoleAccessValue.OTHER) <= 0;
		var repair = (level & RoleAccessValue.REPAIR) <= 0;
		var school = (level & RoleAccessValue.SCHOOL) <= 0;
		
		if(role == wkpm.manager.role.COMMON){
			if(!account){
				$(".role_account").show();
			}else{
				$(".role_account").hide();
			} 
			
			if(!manager){
				$(".role_manager").show();
			}else{
				$(".role_manager").hide();
			}
			
			if(account == false || manager == false){
				$(".role_manager_and_account").show();
			}else{
				$(".role_manager_and_account").hide();
			}
			
			if(property == false || school == false){
				$(".role_property_and_school").show();
			}else{
				$(".role_property_and_school").hide();
			}
			
			if(property){
				$(".role_property").hide();
			}else{
				$(".role_property").show();
			} 
			
			if(bill){
				$(".role_pay").hide();
			}else{
				$(".role_pay").show();
			} 
			
			if(other){
				$(".role_other").hide();
			}else{
				$(".role_other").show();
			}
			
			if(school){
				$(".role_school").hide();
			}else{
				$(".role_school").show();
			}
			
			if(repair){
				$(".role_repair").hide();
			}else{
				$(".role_repair").show();
			}
			$(".role_feedback").hide();
			
		}
		if(role == wkpm.manager.role.SUPER){
			$(".role_account").show();
			$(".role_manager").show();
			$(".role_manager_and_account").show();
			$(".role_property_and_school").show();
			$(".role_property").show();
			$(".role_pay").show();
			$(".role_other").show();
			$(".role_school").show();
			$(".role_repair").show();
			$(".role_feedback").show();
		}
	};
	
	wkpm.validate = function(el,errorId,title,len){
		var val = $(el).val();
		var error = "";
		var valLen = $.trim(val).length; 
		if(valLen > len){
			error = "<span class='errorMsg alert alert-danger'>"+ title +'字数不得大于'+ len +"</span>";
			$("#" + errorId).html(error);
			var newVal = val.substring(0,len);
			$(el).val(newVal);
			return ;
		}else{
			$("#" + errorId).html("");
		}
	};
	
	wkpm.validatePhone = function(val,errorId){
		var result = true;
		var error = "";
		if(!phoneReg.test(val)){
			error = "<span class='errorMsg alert alert-danger'>手机号码格式不正确</span>";
			$("#" + errorId).html(error);
			result = false;
		}
		return result;
	};
	

	wkpm.validateName = function(val,errorId) {
		var result = true;
		var error = "";
		var nameResult = nameReg.test(val);
		var emailResult = emailReg.test(val);
		var phoneResult = phoneReg.test(val);
		if(!(nameResult || emailResult || phoneResult)){
			error = "<span class='errorMsg alert alert-danger'>字母数字组成的6-20个字符</span>";
			$("#" + errorId).html(error);
			result = false;
		}
		return result;
	};
	
	
	wkpm.importFile = function(el){
		studentInfos = "";
		teacherInfos = "";
		 var form = $("#import-file-form");
		   form.ajaxSubmit({
				success: function(data){
					if(data.done){
						studentInfos = data.students;
						teacherInfos = data.teachers;
						var done_stu = data.done_stu;
						var done_tea = data.done_tea;
						if(done_stu && done_tea){
							alert("导入成功！");
							renderHtml = loadJsRender("infoRenderTmpl", wkpmUrl.loadJsrenderURL + "import-list.html");
							$("#" + excelId).html(renderHtml({
										iserror_stu: false,
										iserror_tea: false,
										errors_stus: data.errors_stus,
										errors_teas: data.errors_teas,
										students: data.students,
										teachers: data.teachers,
										title_stu : data.title_stu,
										title_tea : data.title_tea
									}));
						} else if(done_stu == true && done_tea == false){
							if(data.msg_tea == ""){
								alert("上传文件教职工信息数据有误，请检查！");
								renderHtml = loadJsRender("infoRenderTmpl", wkpmUrl.loadJsrenderURL + "import-list.html");
								$("#" + excelId).html(renderHtml({
										iserror_stu: false,
										iserror_tea: true,
										errors_stus: data.errors_stus,
										errors_teas: data.errors_teas,
										students: data.students,
										teachers: data.teachers,
										title_stu : data.title_stu,
										title_tea : data.title_tea
									}));
							}else{
								$("#import_file").val("");
								$("#import-file-submit").prop("disabled",true);
								var msg = data.msg_tea;
								alert(msg);
							}
						}else if(done_stu == false && done_tea == true){
							if(data.msg_stu == ""){
								alert("上传文件学生信息数据有误，请检查！");
								renderHtml = loadJsRender("infoRenderTmpl", wkpmUrl.loadJsrenderURL + "import-list.html");
								$("#" + excelId).html(renderHtml({
										iserror_stu: true,
										iserror_tea: false,
										errors_stus: data.errors_stus,
										errors_teas: data.errors_teas,
										students: data.students,
										teachers: data.teachers,
										title_stu : data.title_stu,
										title_tea : data.title_tea
									}));
							}else{
								$("#import_file").val("");
								$("#import-file-submit").prop("disabled",true);
								var msg = data.msg_stu;
								alert(msg);
							}
						}else if(done_stu == false && done_tea == false){
							if(data.msg_stu == "" && data.msg_tea == ""){
								alert("上传文件学生信息与教师信息数据有误，请检查！");
								renderHtml = loadJsRender("infoRenderTmpl", wkpmUrl.loadJsrenderURL + "import-list.html");
								$("#" + excelId).html(renderHtml({
										iserror_stu: true,
										iserror_tea: true,
										errors_stus: data.errors_stus,
										errors_teas: data.errors_teas,
										students: data.students,
										teachers: data.teachers,
										title_stu : data.title_stu,
										title_tea : data.title_tea
									}));
							}else{
								$("#import_file").val("");
								$("#import-file-submit").prop("disabled",true);
								var msg = "";
								if(data.msg_stu != "") msg += data.msg_stu;
								if(data.mgs_tea != "") msg = msg + "\n" + data.msg_tea;
								alert(msg);
							}
						}
					}else{
						alert(data.msg);
					}
				},
				error: function(){
					alert("操作失败");
					el.disabled = false;
				}
			});
		  $(".msg-ico").tooltip({
			  html : true,
			  delay: { "hide": 200 }
		  });
	};
	
	wkpm.reloadExcel = function(el){
		$("#left").find("li").removeClass('active');
		$.get("export.jsp", function(data) {
			$('#app-main').html(data);
		});
		$("#h_excel_bill").addClass('active');
	};
	
	wkpm.exportExcelToHouseBill = function(el){
		
	};
	
	wkpm.exportBill = function(el){
		$.post("exportHouseBill.do", function(data){
		  el.disabled = false;
		    if(data){
		    	// alert("导入成功");
		    	 $("#left").find("li").removeClass('active');
		    	 if(confirm("数据已导入成功,是否需要跳转到缴费管理界面？")){
		    		 $.get('house_bill_info.do', function(data) {
							$('#app-main').html(data);
		    		 });
		    		 $("#h4").addClass('active');
		    	 }else{
		    		 $.get('export.jsp', function(data) {
		    			 $('#app-main').html(data);
		    		 });
		    		$("#h_excel_bill").addClass('active');
		    	 }
		    }else{
		    	alert("导入有误，请重新操作");
		    }
	    }, "json").fail(function(){
		    el.disabled = false;
		    alert("导入有误，请重新操作！");
	    });
		el.disabled = true;
	};
	
	wkpm.exportPersonFile = function(el){
		 var form = $("#export-file-form");
		   form.ajaxSubmit({
				success: function(data){
					var errors = data.errors;
					var title = data.title;
					personInfos = data.personInfos;
					if(data.done){
						alert("导入成功！");
						renderHtml = loadJsRender("personRenderTmpl", wkpmUrl.loadJsrenderURL + "personinfo-list.html");
						$("#" + excelId).html(renderHtml({
									iserror: false,
									errors: errors,
									personInfos: personInfos,
									title : title
								}));
					} else{
						if(data.msg == ""){
							alert("文件数据部分有误，导入失败！");
							renderHtml = loadJsRender("personRenderTmpl", wkpmUrl.loadJsrenderURL + "personinfo-list.html");
							$("#" + excelId).html(renderHtml({
										iserror: true,
										errors: errors,
										personInfos: personInfos,
										title : title
										
									}));
						}else{
							$("#export_file").val("");
							$("#export-file-submit").prop("disabled",true);
							alert(data.msg);
						}
					}
				},
				error: function(){
					alert("操作失败");
					el.disabled = false;
				}
			});
	};
	
	wkpm.exportPerson = function(el){
		var persons = JSON.stringify(personInfos);
		$.post("saveInitPersonInfo.do", {
				personInfos : persons
			},function(data){
				el.disabled = false;
				var msg = data.msg;
		    if(data.done){
		    	$("#left").find("li").removeClass('active');
		    	 if(confirm("数据已导入成功，是否需要跳转到住户管理界面？")){
		    		 $.get('personal_info.do', function(data) {
							$('#app-main').html(data);
		    		 });
		    		 $("#h3").addClass('active');
		    	 }else{
		    		 $.get('person_info.jsp', function(data) {
		    			 $('#app-main').html(data);
		    		 });
		    		$("#h_excel_person").addClass('active');
		    	 }
		    	 
		    	/* $.get('person_info.jsp', function(data) {
		    			 $('#app-main').html(data);
		    		});*/
		    }else{
		    	if(msg == ""){
		    		alert("导入有误，请重新操作");
		    	}else{
		    		alert(msg);
		    	}
		    }
	    }, "json").fail(function(){
		    el.disabled = false;
		    alert("导入有误，请重新操作！");
	    });
		el.disabled = true;
	};
	
	wkpm.reloadImportExcel = function(el){
		$("#left").find("li").removeClass('active');
		$.get("import.jsp", function(data) {
			$('#app-main').html(data);
		});
		$("#h_excel_import").addClass('active');
	};
	
	wkpm.checkAll = function(el){
		var bool = $(el).prop("checked");
		$("[name='che_role']").prop("checked", bool);
	};
	
	wkpm.checkRole = function(el){
		if ($("[name='che_role']:not(:checked)").length == 0) {
			$('#checkAll').prop('checked', true);
		} else {
			$('#checkAll').prop('checked', false);
		}
	};
	
	wkpm.initShowRole = function(level,role){
		var user = (level & 1) > 0;
		var manager = (level & 2) > 0;
		var wuye = (level & 4) > 0;
		var bill = (level & 8) > 0;
		var other = (level & 16) > 0;
		var repair = (level & 32) > 0;
		var school = (level & 64) > 0;
		if(role == wkpm.manager.role.COMMON){
			if(user){
				$.get('userList.do',{
					role : wkpm.role.STUDENT
				}, function(data) {
					$('#app-main').html(data);
					$("#h2").addClass('active');
				});
			}
			if(user == false && manager == true){
				$.get('managerList.do', function(data) {
					$('#app-main').html(data);
					$("#h1").addClass('active');
				});
			};
			
			if(user == false && manager == false && wuye == true){
				$.get('suggest.do', function(data) {
					$('#app-main').html(data);
					$("#h17").addClass('active');
				});
			}
			
			if(user == false && manager == false && wuye == false && school == true){
				$.get('postList.do', function(data) {
					$('#app-main').html(data);
					$("#h14").addClass('active');
				});
			}
			if(user == false && manager == false && wuye == false && school == false && bill == true){
				$.get('queryRechargeList.do', function(data) {
					$('#app-main').html(data);
					$("#h_4_1").addClass('active');
				});
			}
			if(user == false && manager == false && wuye == false && school == false && bill == false && repair == true){
				$.get('queryRepairOrders.do', function(data) {
					$('#app-main').html(data);
					$("#h_repair_one").addClass('active');
				});
			}
			
			if(user == false && manager == false && wuye == false && school == false && bill == false && repair == false && other == true){
				$.get('adList.do', function(data) {
					$('#app-main').html(data);
					$("#h9").addClass('active');
				});
			}
		}
		
		if(role == wkpm.manager.role.SUPER){
			$.get('userList.do',{
				role : wkpm.role.STUDENT
			}, function(data) {
				$('#app-main').html(data);
				$("#h2").addClass('active');
			});
		}
	};
	
	wkpm.importInfo = function(el,_status){
		$.ajax({
			   type: "POST",
			   url: "saveImportInfos.do",
			   dataType : "json",
			   data: {
				   status : _status
			   },
			   async: true,  
			   beforeSend : function(){
				   $.blockUI({
						 message : '<h1><img alt="" src="/GKYManage/resource/css/img/loading.gif">请耐心等待，数据正在导入...</h1>',
						 css: {
						        backgroundColor: '#fbfbfb',
						        backgroundPosition: '20px 8px',
						        backgroundRepeat: 'no-repeat',
						    },
						    overlayCSS: {
						        backgroundColor: '#cccccc',
						    }
					 });
			   },
			   success: function(data){
				   $.unblockUI();
				   if(data.done){
					   $("#left").find("li").removeClass('active');
					   if(data.status == 1){
						   if(confirm("数据已导入成功，是否需要跳转到学生信息界面？")){
							     //TODO:
					    		 $.get('students.do', function(data) {
										$('#app-main').html(data);
					    		 });
					    		 $("#h3").addClass('active');
					    	 }else{
					    		 $.get('import.jsp', function(data) {
					    			 $('#app-main').html(data);
					    		 });
					    		$("#h_excel_import").addClass('active');
					    	 }
					   }else if(data.status == 2){
						   if(confirm("数据已导入成功，是否需要跳转到教职工信息界面？")){
							     //TODO:
					    		 $.get('teachers.do', function(data) {
										$('#app-main').html(data);
					    		 });
					    		 $("#h_1_4").addClass('active');
					    	 }else{
					    		 $.get('import.jsp', function(data) {
					    			 $('#app-main').html(data);
					    		 });
					    		$("#h_excel_import").addClass('active');
					    	 }
					   }else if(data.status == 3){
						   $('#navigate_dialog').modal({
								keyboard : false,
								backdrop : "static"
							});
					   }
				    	//alert('导入成功!');
				    }else{
				    	alert("导入有误，请重新操作");
				    	//el.disabled = true;
				    }
			   },
			   error : function(){
				   alert("操作失败");
				   $.unblockUI();
			   }
			});
		
		
		/*var form = $("#__improt_form__");
		$("#_import_status_").val(_status);
		var msg = $("#__test_msg__");
		form.ajaxSubmit({
			beforeSend: function(){
				msg.html("0%");
			},
			uploadProgress: function(event, position, total, percentComplete){
				console.log(percentComplete);
				msg.html(percentComplete + '%');
			},
			success: function(data){
				if(data.done){
					msg.html("100%");
				} else{
					alert("导入有误，请重新操作");
					msg.html("");
				}
			},
			error: function(){
				alert("导入有误，请重新操作");
				msg.html("");
			}
		});*/
		
		
		/*$.post("saveImportInfos.do", {
				students : JSON.stringify(studentInfos),
				teachers : JSON.stringify(teacherInfos),
				status : _status
			},function(data){
				$.unblockUI();
				//el.disabled = false;
		    if(data.done){
		    	$.growlUI('导入成功!');
		    	$("#left").find("li").removeClass('active');
		    	 if(confirm("数据已导入成功，是否需要跳转到住户管理界面？")){
		    		 $.get('personal_info.do', function(data) {
							$('#app-main').html(data);
		    		 });
		    		 $("#h3").addClass('active');
		    	 }else{
		    		 $.get('person_info.jsp', function(data) {
		    			 $('#app-main').html(data);
		    		 });
		    		$("#h_excel_person").addClass('active');
		    	 }
		    }else{
		    	alert("导入有误，请重新操作");
		    	//el.disabled = true;
		    }
	    }, "json").fail(function(){
	    	$.unblockUI();
		    //el.disabled = false;
		    alert("导入有误，请重新操作！");
	    });
		//el.disabled = true;
*/
	};
	
	function loadJsRender(name, path){
		var renderer = $.render[name];
		if(renderer == null){
			$.ajax({
						url: path,
						dataType: "text",
						async: false,
						success: function(data){
							var temp = [];
							temp[name] = data;
							$.templates(temp);
							renderer = $.render[name];
						},
				         error : function(){
				        	 alert("找不到文件路径");
				         }
					});
			return renderer;
		}
		return renderer;
	}
	
	return wkpm;
})();

jQuery.fn.reverse = [].reverse;
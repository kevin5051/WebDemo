;
CRD = (typeof(CRD) == "undefined") ? {} : CRD;
CRD.attachment = (function(){
	var basePath = "/GKYManage/";
	var limitFileCount = 6, limitFileSize = 3 * 1024 * 1024,  editKeys = {}, removeCount = 0;
	var browseNum = 0, zero = 0;
	var maxImgWidth = 50, maxImgHight = 58;
	var rid = -1;
	var imgIds = [];
	
	var attachment = {
			imgType: {
				"SHOP" : "rmShopImgs.do",
				"HOUSE" : "rmHouseImgs.do"
			}
		};

	var exclusionFile = {
		"js": true,
		"ws": true,
		"vb": true,
		"exe": true,
		"com": true,
		"vbs": true,
		"vbe": true,
		"cmd": true,
		"bat": true,
		"wsf": true,
		"scr": true,
		"shs": true,
		"pif": true,
		"hta": true,
		"jar": true,
		"jse": true,
		"lnk": true,
		"dll": true,
		"dmg": true
	};
	
	function getCheckedIds(idx){
		imgIds = [];
		$("#_crd_attachment_old_file_tab_" + idx).find("[name='attachment']").each(function(){
					if(this.checked) imgIds.push(this.value);
				});
	}

	function checkFileName(fileName){
		var len = fileName.length;
		var poinIndex = fileName.lastIndexOf(".");
		if(poinIndex < len - 1){
			var suf = fileName.substring(poinIndex + 1).toLowerCase();
			if(exclusionFile[suf] != null){
				alert("Selected file contain in exclusion list!");
				return false;
			}
		}
		return true;
	}

	function checkFileSize(fileSize){
		if(fileSize > limitFileSize){
			alert("选择的图片尺寸大小超过规定范围！");
			browseNum--;
			return false;
		}
		return true;
	}

	function checkUploadButton(idx){
		var disabled = true;
		var count = 0;
		$("#_crd_attachment_edit_upload_" + idx).find("[type='file']").each(function(){
					if(this.value.length > 0){
						disabled = false;
						count++;
						return false;
					}
				});
		$("#_crd_attachemnt_upload_btn_" + idx).prop("disabled", disabled);
		$("#_crd_attachment_upload_browse_" + idx).prop("disabled", disabled);
		if(count == zero){
			$("#_crd_attachment_upload_browse_" + idx).prop("disabled", false);
		}
	}

	function showAttachments(ufis, idx){
		for(var i = 0, l = ufis.length; i < l; i++){
			ufis[i].idx = idx;
			var html = $("#_crd_attachment_edit_files_tmpl_").render(ufis[i]);
			$("#_crd_attachment_new_file_tab_" + idx).append(html);
		}
	}

	attachment.check = function(idx){
		var els = $("#_crd_attachment_edit_files_" + idx).find("[name='attachment']"), size = 0;
		els.each(function(){
					if(this.checked) size++;
				});
		var len = els.length;
		$("#_crd_attachment_check_all_" + idx).prop("checked", size == len);
		$("#_crd_attachment_remove_btn_" + idx).prop("disabled", size == 0);
	};

	function fileUploadFail(forms, i, ufis, idx, keyIdx){
		var message = "Upload file encounters an error!";
		if(ufis.length > 0){
			message += "\nBut some file upload successfully.";
			setTimeout(function(){
						if(idx != ""){
							$("#_crd_attachment_edit_upload_" + idx).hide();
							$("#attach-footer").show();
							$("#_crd_attachment_edit_files_" + idx).show();
							$("#_crd_attachment_add_btn_" + idx).show();
							$("#_crd_attachment_remove_btn_" + idx).show();
							attachment.check(idx);
							setTimeout(function(){
										setUploadForm(idx, keyIdx, limitFileCount);
									}, 1);
						} else{
							showAttachments(ufis, keyIdx);
							for(var l = forms.length; i < l; i++){
								var index = $(forms[i]).find("[type='file']").attr("index");
								$("#_crd_attachment_upload_browse_" + idx + "_" + index).prop("disabled", false);
							}
						}
					}, 1);
		}
				window.alert(message);
	}

	function setUploadForm(idx, keyIdx, len){
		var newAttachments = [];
		var size = len + removeCount - keyIdx;
		for(var i = 1; i <= size; i++){
			newAttachments.push({});
		}
		var html = $("#_crd_attachment_edit_upload_tmpl_").render({
					idx: idx,
					key_idx: keyIdx,
					module_id : rid,
					newAttachments: newAttachments
				});
		$("#_crd_attachment_edit_upload_" + idx).html(html);
	}

	function finishUpload(ufis, idx, keyIdx){
		setTimeout(function(){
					if(idx != ""){
						showAttachments(ufis, idx);
						$("#_crd_attachment_edit_upload_" + idx).hide();
						$("#attach-footer").show();
						$("#_crd_attachment_edit_files_" + idx).show();
						$("#_crd_attachment_add_btn_" + idx).show();
						$("#_crd_attachment_remove_btn_" + idx).show();
						attachment.check(idx);
						setTimeout(function(){
									setUploadForm(idx, keyIdx, limitFileCount);
								}, 1);
					} else{
						showAttachments(ufis, keyIdx);
						attachment.check(keyIdx);
						$("#_crd_attachment_upload_dialog_").modal("hide");
					}
				}, 1);
		window.alert("上传图片成功！");
	}

	function fileFormSubmit(forms, i, ufis, el, idx, keyIdx){
		if(i == forms.length){
			el.disabled = false;
			alert("上传成功");
			$("#_crd_attachment_edit_dialog_" + idx).modal("hide");
			$("#_crd_attachment_upload_dialog_").modal("hide");
			$('.modal-backdrop').remove();
			$("#__crd_attachment_edit_div__").empty();
			$("#_crd_attachment_edit_upload_").empty();
			return;
		}
		var form = $(forms[i]);
		var file = form.find("[type='file']");
		if(!file.prop("disabled") && file.val() != ""){// file.disabled mean this file upload finished
			var index = file.attr("index");
			var clear = $("#_crd_attachment_upload_clear_" + idx + "_" + index);
			var msg = $("#_crd_attachment_upload_msg_" + idx + "_" + index);
			form.ajaxSubmit({
						beforeSend: function(){
							msg.html("0%");
						},
						uploadProgress: function(event, position, total, percentComplete){
							msg.html(percentComplete + '%');
						},
						success: function(data){
							if(data.done){
								msg.html("100%");
								//ufis.push(data.hi.id);
								file.prop("disabled", true);
								clear.prop("disabled", true);
								fileFormSubmit(forms, i + 1, ufis, el, idx, keyIdx);
							} else{
								el.disabled = false;
								msg.html("");
								fileUploadFail(forms, i, ufis, idx, keyIdx);
							}
						},
						error: function(){
							alert("操作失败");
							el.disabled = false;
							msg.html("");
							fileUploadFail(forms, i, ufis, idx, keyIdx);
						}
					});
		} else{
			fileFormSubmit(forms, i + 1, ufis, el, idx, keyIdx);
		}
	}

	function removeOldAttachment(){
		for(var key in imgIds){
			$("#_crd_attachment_tr_" + imgIds[key]).remove();
		}
	}

	function checkAllAttachments(idx){
		var ids = $("#_crd_attachment_edit_files_" + idx).find("[name='attachment']");
		if(ids.length == 0){
			$("#_crd_attachment_add_btn_" + idx).hide();
			$("#_crd_attachment_edit_files_" + idx).hide();
			$("#_crd_attachment_remove_btn_" + idx).hide();
			$("#_crd_attachemnt_cancel_btn_" + idx).hide();
			$("#_crd_attachment_edit_upload_" + idx).show();
		}
	}

	attachment.setMaxImgWidth = function(w){
		if(w != null && w > 0) maxImgWidth = w;
	};

	attachment.setMaxImgHight = function(h){
		if(h != null && h > 0) maxImgHight = h;
	};

	attachment.checkAll = function(el, idx){
		var count = 0;
		var checked = el.checked;
		$("#_crd_attachment_edit_files_" + idx).find("[name='attachment']").each(function(){
					if(!this.disabled){
						this.checked = checked;
						if(checked){
							count++;
						}
					}
				});
		if(count == 0){
			el.checked = false;
		}
		$("#_crd_attachment_remove_btn_" + idx).prop("disabled", count < 1);
	};

	attachment.upload = function(el, idx, keyIdx){
		browseNum = zero;
		$("#_crd_attachemnt_upload_btn_" + idx).prop("disabled", true);
		var div = $("#_crd_attachment_edit_upload_" + idx);
		div.find("[name='attachmentBrowse']").prop("disabled", true);
		fileFormSubmit(div.find("form"), 0, [], el, idx, keyIdx);
	};

	

	function afterRemoveAttachment(idx){
		checkAllAttachments(idx);
		$("#_crd_attachment_check_all_" + idx).prop("checked", false);
		$("#_crd_attachment_remove_btn_" + idx).prop("disabled", true);
		$("#_crd_attachment_add_btn_" + idx).prop("disabled", false);
	}

	attachment.remove = function(el, idx, url){
		getCheckedIds(idx);
		var size = imgIds.length;
		if(window.confirm("确定把这" + size + "张图片删除吗？")){
				removeCount = size;
				var postData = $.param({
					imgIds: imgIds
						}, true);
				$.post(url, postData).always(function(data){
							el.disabled = false;
							if(data == "success"){
								alert("删除成功");
								removeOldAttachment();
								afterRemoveAttachment(idx);
								
							} else{
								alert("删除失败，请重新尝试或者刷新页面。");
							}
						});
				el.disabled = true;
		}
	};

	attachment.resizeImg = function(el){
		var maxW = maxImgWidth;
		var maxH = maxImgHight;
		var img = new Image();
		img.src = el.src;
		var w = img.width;
		var h = img.height;
		if(w == 0 || h == 0){// reset image
			el.src = basePath + "media/images/common/file.png";
			img.src = el.src;
			w = img.width;
			h = img.height;
			el.setAttribute("has-full-img", "false");
		}
		var wRatio = maxW / w;
		var hRatio = maxH / h;
		var ratio = 1;
		if(maxW != 0 && maxH != 0){
			if(maxW == 0){
				if(hRatio < 1) ratio = hRatio;
			} else if(maxH == 0){
				if(wRatio < 1) ratio = wRatio;
			} else if(wRatio < 1 || hRatio < 1){
				ratio = (wRatio <= hRatio ? wRatio : hRatio);
			}
		}
		if(ratio < 1){
			w = w * ratio;
			h = h * ratio;
		}
		el.width = w;
		el.height = h;
	};

	attachment.showFullImg = function(el, type){
		el = $(el);
		var isHasFullImg = el.attr("has-full-img");
		if(isHasFullImg == "true"){
			$("#_crd_attachment_" + type + "_img_").attr("src", el.attr("src"));
			$("#_crd_attachment_" + type + "_img_dialog_").modal({
						backdrop: "static",
						keyboard: true
					});
		}
	};

	attachment.checkFile = function(el, idx, imgPreviewId){
		if(el.value != ""){
			var file = el.files[0];
			var fileName = file.name;
			var fileSize = file.size;
			var index = $(el).attr("index");
			//var result = checkFileSize(fileSize) && checkFileName(fileName);
			var result = checkFileSize(fileSize);
			if(result){
				var bool = checkImage(fileName);
				if(bool){
					$("#_crd_attachment_upload_name_" + idx + "_" + index).val(fileName);
					$("#_crd_attachment_upload_clear_" + idx + "_" + index).prop("disabled", false);
					$("#_crd_attachemnt_upload_btn_" + idx).prop("disabled", false);
					CRD.attachment.previewImage(el,imgPreviewId);
				}else{
					  browseNum--;
					  alert("您上传的图片类型必须是.gif,jpeg,jpg,png中的一种");
				}
				
			}else{
				browseNum--;
				el.value = "";
				$("#_crd_attachment_upload_name_" + idx + "_" + index).val("");
				$("#_crd_attachment_upload_clear_" + idx + "_" + index).prop("disabled", true);
				checkUploadButton(idx);
			}
			
		}
	};
	
	function checkImage(fileName){
		var name = fileName.toLowerCase();
	     if(!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(name)){
	           return false;
	        }
	     return true;
   } 

	attachment.browse = function(el, idx, index){
		var maxCount = limitFileCount - index - 1;
		if (index.length == zero || idx.length == zero) {
			index = browseNum;
			browseNum++;
		}
		var count = 0;
		$("#_crd_attachment_edit_upload_" + idx).find("[type='file']").each(function() {
			    if (this.value.length > 0) {
				    count++;
			    }
		    });
		if (count >= maxCount) {
			browseNum = zero;
			el.disabled = true;
		}
		
		$("#_crd_attachment_upload_file_" + idx + "_" + index).click();
	};

	attachment.clear = function(el, idx, index){
		browseNum = index;
		$("#_crd_attachment_upload_file_" + idx + "_" + index).val("");
		$("#_crd_attachment_upload_name_" + idx + "_" + index).val("");
		$("#crd_image_" + idx + "_" + index).attr("src","");
		$("#a_crd_image_" + idx + "_" + index).attr("href","");
		$("#div_crd_image_" + idx + "_" + index).hide();
		
		checkUploadButton(idx);
		el.disabled = true;
	};

	attachment.cancel = function(el, idx, keyIdx){
		var els = $("#_crd_attachment_edit_upload_" + idx).find("[type='file']");
		var hide = true;
		els.each(function(){
					if(this.value != ""){
						if(!window.confirm("选择的图片还没上传，您确定要取消吗？")){
							hide = false;
						}
						return false;
					}
				});
		if(hide) $("#_crd_attachment_upload_dialog_").modal("hide");
	};

	attachment.edit = function(key){
		var idx = editKeys[key];
		$("#_crd_attachment_edit_dialog_" + idx).modal({
					backdrop: "static",
					keyboard: true
				});
	};

	attachment.initEdit = function(key, id, attachments, callback) {
		browseNum = 0;
		removeCount = 0;
		if (editKeys[key] != null) {
			$("#_crd_attachment_edit_dialog_" + editKeys[key]).remove();
		}
		var newAttachments = [];
		for ( var i = 1; i <= limitFileCount + removeCount; i++) {
			newAttachments.push({});
		}
		var idx = attachments.length;
		var html = $("#_crd_attachment_edit_tmpl_").render({
			idx : idx,
			key_idx : "",
			module_id : id,
			attachments : attachments,
			newAttachments : newAttachments
		});
		
		$("#__crd_attachment_edit_div__").prepend(html);

		if(attachments != null && attachments.length > 0){
			$("#_crd_attachment_edit_upload_" + idx).hide();
			$("#attach-footer").show();
		} else{
			$("#_crd_attachment_edit_files_" + idx).hide();
			$("#_crd_attachment_add_btn_" + idx).hide();
			$("#_crd_attachment_remove_btn_" + idx).hide();
			$("#_crd_attachemnt_cancel_btn_" + idx).hide();
		}
		
		editKeys[key] = idx;
		attachment.edit(key);
		if(idx == 6){
			$("#_crd_attachment_add_btn_" + idx).prop("disabled",true);
		}else{
			$("#_crd_attachment_add_btn_" + idx).prop("disabled",false);
		}
		if (typeof callback == "function")
			callback(true);
	};

	attachment.distoryEdit = function(key){
		var idx = editKeys[key];
		if(idx != null){
			$("#_crd_attachment_view_dialog_" + idx).remove();
			delete editKeys[key];
		}
	};

	attachment.getIds = function(key){
		var ids = [], idx = editKeys[key];
		$("#_crd_attachment_edit_files_" + idx).find("[name='attachment']").each(function(){
					ids.push(this.value);
				});
		return ids;
	};
	
	attachment.showAttachmentFile = function(el, type, id){
		showAttachmentImageId = id;
		el = $(el);
			$("#_crd_attachment_" + type + "_img_").attr("src", el.attr("src"));
			$("#_crd_attachment_" + type + "_img_dialog_").appendTo("body").modal({
						backdrop: "static",
						keyboard: true
					});
	};
	
	attachment.addNew = function(el, idx, module_id){
		rid = module_id;
		setUploadForm("", idx, limitFileCount);
		$("#_crd_attachment_upload_dialog_").appendTo("body").modal({
					backdrop: "static",
					keyboard: true
				});
	};
	
	attachment.previewImage = function(obj, imgPreviewId, divPreviewId) {
         var allowExtention = ".jpg,.bmp,.gif,.png,。jpeg"; //,允许上传文件的后缀名
         var extention = obj.value.substring(obj.value.lastIndexOf(".") + 1).toLowerCase();
         var browserVersion = window.navigator.userAgent.toUpperCase();
         if (allowExtention.indexOf(extention) > -1) {
             if (browserVersion.indexOf("MSIE") > -1) {
                 if (browserVersion.indexOf("MSIE 6.0") > -1) {//ie6
                     document.getElementById(imgPreviewId).setAttribute("src", obj.value);
                     document.getElementById("a_"+ imgPreviewId).setAttribute("href", obj.value);
                     $("#div_"+ imgPreviewId).show();
                 } else {//ie[7-8]、ie9
                     obj.select();
                     var newPreview = document.getElementById(divPreviewId + "New");
                     if (newPreview == null) {
                         newPreview = document.createElement("div");
                         newPreview.setAttribute("id", divPreviewId + "New");
                         newPreview.style.width = 160;
                         newPreview.style.height = 170;
                         newPreview.style.border = "solid 1px #d2e2e2";
                     }
                     newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
                     var tempDivPreview = document.getElementById(divPreviewId);
                     tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
                     tempDivPreview.style.display = "none";
                 }
             } else if (browserVersion.indexOf("FIREFOX") > -1) {//firefox
                 var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
                 if (firefoxVersion < 7) {//firefox7以下版本
                     document.getElementById(imgPreviewId).setAttribute("src", obj.files[0].getAsDataURL());
                     document.getElementById("a_"+ imgPreviewId).setAttribute("href", obj.files[0].getAsDataURL());
                     $("#div_"+ imgPreviewId).show();
                 } else {//firefox7.0+                    
                     document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(obj.files[0]));
                     document.getElementById("a_"+ imgPreviewId).setAttribute("href", window.URL.createObjectURL(obj.files[0]));
                     $("#div_"+ imgPreviewId).show();
                 }
             } else if (obj.files) {
                 //兼容chrome、火狐等，HTML5获取路径                   
                 if (typeof FileReader !== "undefined") {
                     var reader = new FileReader();
                     reader.onload = function (e) {
                         document.getElementById(imgPreviewId).setAttribute("src", e.target.result);
                         document.getElementById("a_"+ imgPreviewId).setAttribute("href", e.target.result);
                         $("#div_"+ imgPreviewId).show();
                     };
                     reader.readAsDataURL(obj.files[0]);
                 } else if (browserVersion.indexOf("SAFARI") > -1) {
                     alert("暂时不支持Safari浏览器!");
                 }
             } else {
                 document.getElementById(divPreviewId).setAttribute("src", obj.value);
             }
         } else {
             alert("仅支持" + allowSuffix + "为后缀名的文件!");
             obj.value = ""; //清空选中文件
             if (browserVersion.indexOf("MSIE") > -1) {
                 obj.select();
                 document.selection.clear();
             }
             obj.outerHTML = obj.outerHTML;
         }
     };
     
	return attachment;
})();
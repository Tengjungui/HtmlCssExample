/**
 * 拖拽上传组件
 * @param  {Object} $ 依赖jQuery
 * @return {Object}   upload
 * @author M.J
 * @Date   2014-08-24
 * @URL    http://webjyh.com
 */
define( ['jquery'], function( $ ){

	/**
	 * 获取需要的元素
	 * @type {Elements} 
	 */
	var $ = $,
	    $document = $(document),
	    $dropOverlay = $('#dropOverlay'),
	    $uploadDialog = $('#upload-dialog'),
	    $uploadTitle = $('#upload-dialog-header > div'),
	    $uploadClose = $('#upload-dialog-header .uplaod-dialog-close'),
	    $uploadWinodw = $('#upload-dialog-header .uplaod-dialog-minWindow'),
	    $uploadList = $('#upload-dialog-list');

	/**
	 * 上传列表的模板
	 * @type {String}
	 */
	var templates = 
			'<div class="mask"></div>' + "\n" + 
			'<div class="file-name">{fileName}</div>'  + "\n" +
			'<div class="file-size">{fileSize}</div>'  + "\n" +
			'<div class="file-folder"><a href="javascript:void(0)">{filePath}</a></div>'  + "\n" +
			'<div class="file-operating"><a class="icon {className}" href="javascript:void(0)"></a></div>' + "\n";

	/**
	 * 转换字节大小
	 * @param  {Number} size 文件大小以Bit为单位
	 * @return {String}      转换后的单位默认保留一位数字
	 */
	var unit = function( size ){
		var key = parseInt( (size.toString().length-1) / 3 ),
		    unit = [ 'B', 'KB', 'MB', 'GB' ],
		    mod = 0;

		switch ( key ){
			case 0: mod = size; break;
			case 1: mod = size / 1024; break;
			case 2: mod = size / 1024 / 1024; break;
			case 3: mod = size / 1024 / 1024 / 1024; break;
		}

		return mod.toFixed(1) + ' ' + unit[key];
	};

	//拖拽上传核心
	var upload = {

		QueueFile : [],
	    listElem : [],

		init: function( options ){
			this.config = this.cover( options, this.options );
			this.dragEvent();
			this.uploadEvent();
		},

		/**
		 * 合并默认配置项
		 * @param  {Object} options  新配置项
		 * @param  {Object} defaults 默认配置项
		 * @return {Object}          合并后的项目
		 */
		cover: function( options, defaults ){
			var i, options = options || {};
			for ( i in defaults ){
				if ( options[i] === undefined ) options[i] = defaults[i];
			}
			return options;
		},

		/**
		 * 文件拖拽实事件
		 * @return {this} 
		 */
		dragEvent: function(){
			var _this = this;

			$document.on({
				dragstart: function( event ){
					event.preventDefault();
				},
				dragenter: function( event ){
					event.preventDefault();
					$dropOverlay.show();
				},
				dragover: function( event ){
					event.preventDefault();
					$dropOverlay.css( 'opacity', 0.7 );
				},
				dragleave: function( event ){
					event.preventDefault();
					$dropOverlay.css( 'opacity', 0 );
				}
			});

			$dropOverlay.on( 'mouseup', function(){
				$dropOverlay.hide();
			});

			document.addEventListener( 'drop', function( event ){
				event.stopPropagation();
				event.preventDefault();
				$dropOverlay.css( 'opacity', 0 ).hide();

				var files = event.dataTransfer.files;
				if ( _this.config.init( files ) ){;
					_this.createList( files );
				}

			}, false );

			return this;
		},

		/**
		 * 上传列表事件
		 * @return {this} 
		 */
		uploadEvent: function(){
			var minWindow = function(){
				var name = $uploadDialog.attr('class').indexOf('uplaod-dialog-btn-min');
				( name >= 0 ) ? 
					$uploadDialog.removeClass( 'uplaod-dialog-btn-min' ) 
				: 
					$uploadDialog.addClass( 'uplaod-dialog-btn-min' );
			};

			$uploadTitle.on( 'click', minWindow );
			$uploadWinodw.on( 'click', minWindow ); 
			$uploadClose.on( 'click', function(){
				$uploadList.html('');
				$uploadDialog.addClass('hidden');
			});

			return this;
		},

		/**
		 * 创建上传列表
		 * @param  {Array} files 要上传的文件
		 * @return {null}
		 */
		createList: function( files ){
			
			if ( !files || files.length < 1 ){
				return;
			}

			var _this = this, i = 0, len = files.length;

			for ( var i=0; i<len; i++ ){
				this.QueueFile.push( files[i] );
				var li = document.createElement('li');

				tpl = templates.replace( '{fileName}', files[i].name )
				               .replace( '{fileSize}', unit( files[i].size ) )
				               .replace( '{filePath}', this.config.filePath )
				               .replace( '{className}', 'error' );

				li.innerHTML = tpl;
				$uploadList.append( li );
				this.listElem.push( li );

				$(li).find('a.error').on('click', function(){
					var elem = $(this).parents('li'),
					    index = elem.index();
					_this.QueueFile.splice( index, 1 );
					_this.listElem.splice( index, 1 );
					elem.remove();
				});
			}

			$uploadDialog.removeClass('hidden');
			setTimeout( function(){ $uploadDialog.removeClass('uplaod-dialog-btn-min') }, 100 );
			this.sendFile();
		},

		/**
		 * 发送文件
		 * @return {null}
		 */
		sendFile: function(){

			if ( this.QueueFile.length < 1 ){
				$uploadDialog.addClass('uplaod-dialog-btn-min');
				return false;
			}

			var mask, key,
			    _this = this,
			    formFiles = new FormData(),
			    xhr = new XMLHttpRequest();

			formFiles.append( this.config.fromName, this.QueueFile[0] );
			for ( key in this.config.otherParam ){
				formFiles.append( key, this.config.otherParam[key] );
			}

			/** 上传进度监听 */
			xhr.upload.addEventListener( 'progress', function( event ){
				if ( event.lengthComputable ){
					mask = Math.round( ( event.loaded / event.total )  * 100 ) + '%';
					$(_this.listElem).first().find('div.mask').css( 'width', mask );
				}
			}, false );

			/** 上传完成监听 */
			xhr.upload.addEventListener( 'load', function( ){
				var elem = $(_this.listElem).first().find('a.icon');
				elem.removeClass('error').addClass('success');
			}, false );

			/** 上传出错监听 */
			xhr.upload.addEventListener( 'error', function( ){
				var elem = $(_this.listElem).first();
				elem.addClass('warning;');
			}, false );

			/** 上传状态 */
			xhr.addEventListener( 'readystatechange', function(){
				var elem = $(_this.listElem).first().find('a.icon');

				//取消当前上传
				if ( xhr.readyState == 1 ){
					elem.off().on('click', function(){
						xhr.abort();
						elem.removeClass('success').addClass('error');
						elem.parents('li').addClass('warning');
					});
				}

				if ( xhr.readyState == 4 ){
					if ( xhr.responseText && xhr.status == 200 ){
						var data = $.parseJSON( xhr.responseText );
						elem.off();
						_this.config.success.call( _this, data );
					} else {
						$(_this.listElem).first().addClass('warning');
						_this.config.error.call( _this );
					}
					_this.QueueFile.shift();
					_this.listElem.shift();
					_this.sendFile();
				}

			}, false );

			xhr.open( 'post', this.config.url, true );
			xhr.send( formFiles );

		}

	};

	/**
	 * 上传配置参数	
	 * @type {Object}
	 */
	upload.options = {
		url: './upload.php',
		fromName: 'files',
		filePath: '/Folder',
		otherParam: {},
		init: function(){},
		error: function(){},
		success: function( data ){}
	};

	return upload;
});
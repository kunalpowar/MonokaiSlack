// First make sure the wrapper app is loaded
document.addEventListener("DOMContentLoaded", function() {

   // Then get its webviews
   let webviews = document.querySelectorAll(".TeamView webview");

   // Fetch our CSS in parallel ahead of time
   const cssPath = 'https://cdn.rawgit.com/widget-/slack-black-theme/master/custom.css';
   let cssPromise = fetch(cssPath).then(response => response.text());

   let customCustomCSS = `
   :root {
      /* Modify these to change your theme colors: */
	  --primary: #000F;
      --text: #CCC;
      --background: #222822;
      --background-elevated: #222822;

	  /* These should be less important: */
	  --background-hover: #F63;
	  --background-light: #AAA;
  	  --background-bright: #FFF;
	  --border-dim: #AE480E;
	  --border-bright: #F63;
	  --text-bright: #FFE214;
	  --text-special: #FFFD7F;
	  --scrollbar-background: #A3A4A8;
	  --scrollbar-border: #595A54;
   }

   div.client_channels_list_container {
   	border-right: 3px solid #353535;
   }

   hr.c-message_list__day_divider__line {
   	border-color: #353535;
   }

   button.c-deprecated_button.c-deprecated_button--link.c-mrkdwn__subteam.c-mrkdwn__subteam--link.c-mrkdwn__subteam--mention {
   	background: rgba(0, 0, 0, 0);
    font-weight: bold;
    color: #F63;
   }

   button.c-deprecated_button.c-deprecated_button--link.c-mrkdwn__subteam.c-mrkdwn__subteam--link {
   	background: rgba(0, 0, 0, 0);
    font-weight: bold;
    color: #F63;
   }

   a.c-mrkdwn__member.c-mrkdwn__member--link {
   	background: rgba(0, 0, 0, 0);
    font-weight: bold;
    color: #3AA3E3;
   }

   span.c-mrkdwn__mention {
	background: rgba(0, 0, 0, 0);
   }

   a.c-mrkdwn__member.c-mrkdwn__member--link.c-mrkdwn__member--mention {
   	background: white;
   }

   span.c-mrkdwn__broadcast.c-mrkdwn__broadcast--link.c-mrkdwn__broadcast--mention {
   	color: #F63;
   	background: rgba(0, 0, 0, 0);
   }

   div.c-file_container.c-file_container--gradient.c-file_container--full_width::after {
   	background: none;
   }


   div.c-message.c-message--light.c-message--hover
	{
	color: #FFF !important;
	background-color: #595a54 !important;
	}

	span.c-message__body,
	a.c-message__sender_link,
	span.c-message_attachment__media_trigger.c-message_attachment__media_trigger--caption,
	div.p-message_pane__foreword__description span
	{
			color: #afafaf !important;
	}

	.c-message_attachment__body {
		color: #FFF;
	}

	.c-scrollbar__hider {
    	margin-top: 8px;
	}

	.c-message_attachment__pretext {
		color: #ff9393
	}

	.p-message_pane .c-message_list:not(.c-virtual_list--scrollbar):before, .p-message_pane .c-message_list.c-virtual_list--scrollbar > .c-scrollbar__hider:before {
		background: none;
		border: none;
	}

	pre.special_formatting{
		background-color: #222 !important;
		color: #8f8f8f !important;
		border: solid;
		border-width: 1 px !important;
		
	}
   `

   // Insert a style tag into the wrapper view
   cssPromise.then(css => {
      let s = document.createElement('style');
      s.type = 'text/css';
      s.innerHTML = css + customCustomCSS;
      document.head.appendChild(s);
   });

   // Wait for each webview to load
   webviews.forEach(webview => {
      webview.addEventListener('ipc-message', message => {
         if (message.channel == 'didFinishLoading')
            // Finally add the CSS into the webview
            cssPromise.then(css => {
               let script = `
                     let s = document.createElement('style');
                     s.type = 'text/css';
                     s.id = 'slack-custom-css';
                     s.innerHTML = \`${css + customCustomCSS}\`;
                     document.head.appendChild(s);
                     `
               webview.executeJavaScript(script);
            })
      });
   });
});
# Monokai Slack Theme

This repository is inspired from [slack-black-theme](https://github.com/widget-/slack-black-theme) and especially [this issue](https://github.com/widget-/slack-black-theme/issues/39#issuecomment-356698404)

## Installing

* The testing has been done only on Mac as of this writing. Find `Slack.app` under applications and use `Show Package Contents`
* Find the file the `ssb-interop.js` in `Slack.app/Contents/Resources/app.asar.unpacked/src/static`
* Add the content from code.js at the end of the file and save it
* On restarting Slack, the new theme should be applied

## Edit instructions

There's a lot of scope for improving the closeness of the theme to Monokai.
* Open Slack with developer menu with this `export SLACK_DEVELOPER_MENU=true; open -a /Applications/Slack.app`
* Click on `Toggle Webapp Devtools` under `View > Developer`
* You can now just use inpect element to get to the html code for a block in question and tweak the css
* Add the css changes in `ssb-interop.js` and reload Slack `View > Reload` for the changes to take effect

**Project:** Conference Management

In this project the main objects are Speaker, session, speaker Assignment.

after creating the object i created ConferenceManagement App in that i added the custom objects which i have created.
Apex part: i have created 2 classes : 1. speaker controller
                                      2. speakerassignment handler
                                      and 1 trigger code.
LWC part: i have created some compoenents like : 1. Booksession
                                                 2. speakerList
                                                 3. speakerSearch

i created one lms channel.

Deployment steps order:
===============================
first needs to deploy the Apex classes, and after trigger
next booksession component
        |
     speakerList component
        |
     speakerSearch component

  and then lms channel.

  Ui 
  ================
  open the conference management app in org.
  create the app page with the help of app builder.
  in that Apppage add the components. which needs to execute.

  Functionality working process
  =====================================
  first create the sample records for speaker object , and session object.

  in ui select that sepaker and click on Book session button. 
  After select the date , if the slot is available it will book. otherwise it will display the error message.

  

  




























# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

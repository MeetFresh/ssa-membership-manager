# ssa-membership-manager
CS3312/LMC3431 section JIA team 122 (MeetFresh) project with client Prof. Truran from GaTech
## Release Notes
### Version 1.0:

#### Section I: User interface:
1. Registration, Log-in, Log-out.
2. User profile
3. Subscription payment
4. View announcements, events
5. Events sign-up & payment

#### Section II: Administrator interface:
1. Log-in, Log-out
2. User subscription status management
3. Mailing lists management
4. Announcement edit and publication


### I. User interface
#### 1. Registration, Log-in, Log-out
Any visitor of this site may register as a user with the “sign-up” function, where the user will be asked to provide basic information including name, email, academic status, institution, and password. Once a user register successfully, they can log in to the site by entering their email address and their password on the log-in site. If necessary, the user can also log out from their current profile by clicking “log out” at the upper-right corner of the website.

#### 2. User profile
The user profile consists of the basic information of the user. Aside from the information entered when registering a profile, membership information will also be displayed. A user may modify the content after logging into the profile. All user profiles will only be visible to the users themselves and the administrators.

#### 3. Subscription payment
Users will submit their payment of subscription through Stripe payment platform. After entering the correct information of the user’s debit/credit card, a confirmation will be automatically sent to the user via the user’s registered email, and the fees will be transferred to the society account. The subscription fee varies depending on the user’s academic status.

#### 4. View announcements, events
Users may view the latest announcements and event invitations posted by the administrators from the society.

#### 5. Events sign-up & payment
Similar to subscription payment, payments of events will also be fulfilled by Stripe payment platform. After the payment is completed, the administrators will receive the sign-up notification, so the user will be able to attend the events.

### II. Administrator interface

#### 1. Log-in, Log-out
The administrators share the same log-in and log-out system as users, but with different functionalities and access.

#### 2. User subscription status management
The administrators may check the user profiles and subscription status, and may change the subscription status of any user.

#### 3. Mailing lists management
The administrators have access to mailing lists of different categories. By selecting a group of users, the administrator will be directed to the default email application on their computer with the emails copied as the recipients of the email.

#### 4. Announcement edit and publication
The administrators have access to announcement/events publication. After publishing an announcement, the information will be visible to all users of this site.

## Install Guide
### Pre-requisites:
There is no required configuration of software and hardware that the customer must have before the installation process.

### Dependent libraries that must be installed:
Install node:\
In order to enable the software to function, node shall be installed. 
1. Navigate to this link, https://nodejs.org/en/download/, and the screen would show different installer types for LTS Version (LTS Version should be sufficient)
    1. If you are a Windows user, click **Windows Installer**
    2. If you are a Mac user, click **macOS Installer**
2. As the download of the installer completes, click the installer package and follow the instruction
    1. During the process, you must agree to the terms of the software license agreement
    2. You need to select a destination to install the software
        1. For Mac users, the default Macintosh HD would be sufficient
    3. After the installation completes, you can move the Node.js installer to the Trash
3. Node.js installation completes.

### Download instructions:
We would give our Github repo to our client, so they can get access to the project. 
1. In order to download the project to their local laptop/desktop, they need to navigate to the Github repo, https://github.com/MeetFresh/ssa-membership-manager. 
2. There is a green download button with the text displaying “Code”. Click the button, and it would appear a dropdown with three download methods: Clone, Open with Github Desktop, Download ZIP
3. Select your preferred download method to download the project on your computer

### Installation of actual application
In order to let the actual application work, the dependencies for the frontend shall be installed.
1. Open the terminal on your computer
2. Navigate to the client folder of the project in your terminal
3. Type `npm install` in the terminal to install the dependencies
4. After that, type `npm run-script build` to build the frontend
5. Frontend installation completes

Then, the dependencies for the backend shall be installed
1. Open the terminal on your computer
2. Navigate to the server folder of the project in your terminal
3. Type `npm install` in the terminal to install the dependencies

The client also needs a .env file. Since this file contains private information, it is not included in the Github repo. The client can contact us through email to get the file. The client should put the .env file **under the server folder**.

### Run instructions:
After the client completes all the above instructions, he/she can type `npm start` in the terminal under the server folder.

### Troubleshooting:
**Problem:** Broken npm installation\
**Action:**\
If you are a Mac user, reinstall npm. 
If you are a Windows user, reinstall node from the official installer.

**Problem:** Random error with npm install\
**Action:**\
Some strange issues can be resolved by running `npm cache clean` and trying again.
Use the to `-verbose` option see more details

**Problem:** Not compatible version found\
**Action:**\
You have an outdated npm. Please update to the latest stable node/npm

**Problem:** No git\
**Action:**\
You need to install git. Or, you may need to add your git information to your npm profile.






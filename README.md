# Ice-Mart Mobile Application (MERNN Stack)
## Overview
The “Ice Mart” is a mobile application written for Android operating systems, Designed to help users maintain and organize shop virtually.
This application is easy to use for both beginners and advanced users. It features a familiar and well thoughtout, an attractive user interface, combined with strong searching Insertion.

## User Characteristics
### Admin 
The administrator has all the rights to access the system. He is the one who has all rights to
view the users and product details, modify those details. He can add his product into Ice Mart App.
### User
The user can log in to the system by using his specific email and password. User can view the
products and order the products according to their own needs. He can view his profile and order history, User can find various product by using search option easily, User can also filter and Sort various products. 

## Technologies used
* React Natiive
* Redux Toolkit
* Node Js
* Expess Js

## Database used
* MongoDb

## Project Description and Functionality
### User view 
* User can register or login to the system as user(encryption and decryption of password with the help of bcrypt.js module).
* User can search, sort, filter various products by category.
* User can add products to the cart.
* Used Google maps for auto filling shipping address of user.
* Used Google pay payment gateway for demo virtual payment of orders.
* Only logged-in(authorized) user can see his/her orders used jsonwebtoken for authorization.(middleWare for jwt token verification).
* User can view his profile and order history.

### Admin view
* Admin can add, Edit, Delete his/her product(loggedin authorized).
* Admin can search, sort, filter various products of "Ice Mart".
* Admin can view his profile and order history.

# Nexus Mods Merchandise
A concept for a Kickstarter-like shop for Nexus Mods and Black Tree Gaming.

## Project setup
This will open the app on port *8080* by default, complete with *browserSync* and hot reloading.
```
git clone https://github.com/charliegilmanuk/nexus-mods-merchandise.git
npm install
npm run serve
```

| | |
|----------|:-------------:|
| ![Imgur](https://i.imgur.com/8f6rJXd.jpg) | ![Imgur](https://i.imgur.com/nFRUB1D.png) |

#
---
#
## About this concept
The project was written using the VueJS and Vuetify frameworks, complete with Vuex for state management.

I've supplied a default database of dummy products, which allows you to view each individual product with information, backer progress, add to cart etc.  The admin panel allows you to view/create/edit/remove the products.



Working:
* Shop `/shop`
  * View products, features searching and paging
* Admin `/admin`
  * View all products, features searching and paging
  * Edit products and save to database
  * Remove single or multiple products
  * Create new products
* Cart
  * List all products added to the user's cart
  * Remove items from cart


##### A few words on data

Localforage is used to persist data through sessions and browser closes, this uses IndexedDB primarily but Web SQL and localStorage are used as a fallback.

Data is initially loaded in from the defaults in *~/src/data/* and persisted in forage afterwards.

In a real world example, this would be pulled in from the server API and perhaps only persist the cart through localforage if not the server.  Promises are used throughout so this would be quite easy to change.

### FAQ
* ##### I've messed up the products data and/or want to reset to default, how can I do so?
Use your browser developer console to clear the IndexedDB database, in Chrome this is in *Application > Storage > App > Delete database*, reload the page and the data will be recreated.
* ##### Lots of buttons/site nav don't work!
Intentional.  This is purely a shop concept and not a full site, I could've added click handlers for every link and button that didn't work but that wasn't really in scope.
* ##### Authentication?
None required, again, out of scope and would realistically require a server API.

### Future improvements
Unfortunately due to tight time constraints I didn't quite do everything I would've liked to do, but I may be maintaining this example as a learning process for myself in the future.  Here's what I've got in mind:

* Better responsive design – Overall I just focused on the desktop site, however most of the columns should adjust, only limited mobile compatibility.
* Multiple tiers and prices for the goals (an array of goal objects).
* Front end ORM system like vuex-orm, this would've made the cart/products data sharing a bit easier and make calls to the data simpler and more structured.
* More realistic/redesigned footer.
* Form validation and better elements like datetime pickers
* Image upload for products
* Nuxt.js for SEO purposes.  The shop is very fluid and great to use (in my opinion!) but unfortunately JavaScript doesn't rank very well in search engines.  Rendering it server side using something like Nuxt.js would improve on this.
* Naming started to become an issue in the vuex store, would likely have to either use vuex-orm as above, or have a constants file with names of actions and mutations.
* Further refactoring into separate components, i.e. product cards.
* Allow quantity editing in cart

### Known problems
* N/A

---

Enjoy.
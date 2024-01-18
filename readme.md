# TodoMVC - test

Web UI automated tests of [TodoMVC](https://todomvc4tasj.herokuapp.com/) site with Playwright.

## Technologies

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Node.js](https://nodejs.org/en/)
* [Playwright](https://playwright.dev/)

## Installation

* Before using the framework, you need to install a [Node.js](https://nodejs.org/en/) LTS version.
  Check that Node.js is installed:

```shell
node -v
```
Check that package manager npm is installed:

```shell
npm -v
```

* In the root directory of a project, run:

```shell
git clone https://github.com/metroprog/todomvc-test-pw-js.git
cd todomvc-test-pw-js
npm install 
```

## Test Run

* For execution from the command line, run the command given below:

```shell
npx playwright test

```

## TodoMVC application - Functional map

* actions at filter
  * all
    * create !!!
    * read (display todo list) !!!
    * update
      * change status
        * mark completed
          * one !!!
          * all !!
        * mark active
          * one !!
          * all !
      * edit
        * by Enter !!!
        * by focus loss !
          * by Tab
          * by click outside
        * cancel edit by Esc !!!
    * delete
      * click on x !!!
      * clear completed !!!
      * edit to blank !
  * active
    * create !!
    * read (display todo list) !!
    * update
      * change status
        * mark completed !!
          * one
          * all
        * mark active !
          * all
      * edit !!
        * = actions at>all>edit>*
    * delete !!
      * = actions at>all>delete>*
  * completed
    * create !
    * read (display todo list) !!
    * update
      * change status
        * mark completed !
          * all
        * mark active
          * one !!
          * all !
      * edit !
        * = actions at>all>edit>*
    * delete !!
      * = actions at>all>delete>*
* filtering !!
  * all from
    * active
    * completed
  * active from
    * all
    * completed
  * completed from
    * all
    * active
* items left counter
  * increase !!
    * create
    * mark active
      * one
      * all
  * decrease !!
    * mark completed
      * one
      * all
    * delete active
      * = actions at>all>delete>*
  * don't change !
    * edit
      * by Enter
      * by focus loss
      * by Tab
      * by click outside
      * cancel edit by Esc
    * delete completed
      * = actions at>all>delete>*
  * filtering>*

Priorities:
!!! high
!!  normal
!   low

## Scenario: "TodoMVC provides todos management"

### E2E test of general functionality

Given opened TodoMVC

1 When create "a", "b", "c"
  * Then assert list: "a", "b", "c"
  * Then assert items left: 3

2 Then edit "b" to "b edited"

3 Then mark completed "b edited"

4 When clear completed
  * Then assert list: "a", "c"

5 Then cancel edit "c" to "should cancel"

6 When delete "c"
  * Then assert list: "a"
  * Then assert items left: 1

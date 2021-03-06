# Description

This is the core package for sharing common source code across zidentifier framework packages.

# The Problem

One of the main issues with component based web design is making it easy for QA folks who write UI automation to easily access elements on the page.  The easiest way for them to do this is to query the DOM by an id and quickly skip to exactly what is needed.

Unfortunately, this leads to a conflict with component based design.  Putting ids in the component makes it so that only one of them can be on the page at a time.  This might be fine in practice, but it goes against the point of having components in the first place which is fully reusable code modules.

# The Solution

ZIdentifier attempts to solve this problem by dynamically generating ids based on the parent root components.  For example, if you had a resulting DOM with the following structure:

```html
<parent-view-on-index-page id="some-root-component">
    <child-component zid="child-component-a"></child-component>
    <child-component zid="child-component-b"></child-component>
</parent-view-on-index-page>
<parent-view-on-index-page id="some-root-component-again">
    <child-component zid="child-component-a"></child-component>
    <child-component zid="child-component-b"></child-component>
</parent-view-on-index-page>

```

The child component is determined by the parent-view-on-index-page component.  If we were to just set an id on the child-component, we would have duplicate ids on the DOM.  However, in this case, we are using zid.  Once the zid attribute is processed, you will wind up with the following child components:

```html
<child-component id="some-root-component-child-component-a">
</child-component>
<child-component id="some-root-component-child-component-b">
</child-component>

<child-component id="some-root-component-again-child-component-a">
</child-component>
<child-component id="some-root-component-again-child-component-b">
</child-component>
```

There you have it.  The child ids are generated and based on the parent ids.  As long as your parent ids are unique at the root level, the entire DOM structure will have unique ids as well.  QA folks will love you (mostly).

# Gotchas

There are a few scenarios for which this fails.  If you are dynamically generating elements based on context objects, then you can still wind up with duplicate ids, even with a zid.  This is because the element that you are generating represents a specified object and is not unique in the DOM by itself.

To work around this, you are going to have to use your frameworks interpolation based on the context to generate the id.  For example, assume you are using Angular with the [@zthun/identifier.angular](https://www.npmjs.com/package/@zthun/identifier.angular) package.  You can interpolate context ids with the following pattern.

```html
<div zid="item-list">
    <div [zid]="item.id" *ngFor="let item of items">
</div>
```

Here, the zid will be bound to the item context.  Your item context property binding should be unique amongst all your items; if it isn't, then you will once again have the problem of duplicate ids in the DOM.  This also isn't as convenient as grabbing a static id, but if your QA members have consistent data, then it shouldn't be too much of an issue.  If data is constantly changing, then retrieval by id is probably not going to be the best strategy and you should consider other ways of writing e2e test.  

One other gotcha is that the ids are generated **once**.  Even if the value of item.id changes, the zid will get updated, but the id on the element will not.  This is **intentional** as you don't want to dynamically change ids on an element once it is set.  

# Labels

This feature also supports HTML labels with support for screen readers.  The syntax and rules are the same for using this tool, but the reason for this is to link a label with an appropriate form field.

```html
<div zId="item-editor">
    <label zfor="name-input" />
    <input zid="name-input" type="text" name="item-name-input">
</div>
```

The same rules apply for the labels as the id and the for attribute will be generated given the specified id attribute of the parent tree structure.  

# How to Use

You don't.  This package is automatically installed when using a framework package.  The following is the list of available frameworks that support the ZIdentifier feature.  

<table border="0">
<tr>
    <th>ZIdentifier for Angular (4+)</th>
    <th>ZIdentifier for AngularJS (1.x)</th>
</tr>
<tr valign="middle" align="center">
<td>
<a href="https://www.npmjs.com/package/@zthun/identifier.angular">
    <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="128">
</a>
</td>
<td>
<a href="https://www.npmjs.com/package/@zthun/identifier.angularjs">
    <img src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg" width="96"/>
</a>
</td>
</tr>
</table>

# Contribution

You can always contribute additional frameworks.  To do so, you can just install the core package.  Make sure to make @zthun/identifier.core as a dependency in your package.json.  DO NOT make it a devDependency or peerDependency.  The framework package is responsible for installing the correct version of the core package.  

```sh
npm install @zthun/identifier.core --save
```

If you need to contribute bug fixes or additional functionality to the core package, please fork the repo on github.  If you just want to hack away and mess around with the core package, you can just clone the repository.   

```sh
git clone https://github.com/zthun/zidentifier.core
```

You will need to do a pull request for any specified changes.  Please make sure that any pull requests do a compare across forks.   

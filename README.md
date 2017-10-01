# Description

This is the core package for sharing common source code across zidentifier framework packages.

# The Problem

One of the main issues with component based web design is making it easy for QA folks who write UI automation to easily access elements on the page.  The easiest way for them to do this is to query the DOM by an id and quickly skip to exactly what is needed.

Unfortunately, this leads to a conflict with component based design.  Putting ids in the component makes it so that only one of them can be on the page at a time.  This might be fine in practice, but it goes against the point of having components in the first place which is full reusable code modules.

# The Solution

ZIdentifier attempts to solve this problem by dynamically generating ids based on the parent root components.  For example, if you had a resulting DOM with the following structure:

```
<parent-view-on-index-page id="some-root-component">
    <child-component zId="child-component-a"></child-component>
    <child-component zId="child-component-b"></child-component>
</parent-view-on-index-page>
<parent-view-on-index-page id="some-root-component-again">
    <child-component zId="child-component-a"></child-component>
    <child-component zId="child-component-b"></child-component>
</parent-view-on-index-page>

```

The child component is determined by the parent-view-on-index-page component.  If we were to just set an id on the child-component, we would have duplicate ids on the DOM - a big no-no in the HTML5 world.  However, in this case, we are using zId.  Once the zId attribute is processed, you will wind up with the following child components:

```
<child-component id="some-root-component-child-component-a">
</child-component>
<child-component id="some-root-component-child-component-b">
</child-component>

<child-component id="some-root-component-again-child-component-a">
</child-component>
<child-component id="some-root-component-again-child-component-b">
</child-component>
```

There you have it.  The child ids are generated and based on the parent ids.  As long as your parent ids are unique at the root level, the entire DOM structure will have unique ids as well.  QA folks will love you.

# Gotchas

There is one scenario for which this fails.  If you are dynamically generating elements based on context objects, then you can still wind up with duplicate ids, even with a zId.  This is because the element that you are generating represents a specified object and is not unique in the DOM by itself.

To work around this, you are going to have to use your frameworks interpolation based on the context to generate the id.  For example, assume you are using Angular with the [@zthun/zidentifier.angular](https://www.npmjs.com/package/@zthun/zidentifier.angular) package.  You can interpolate context ids with the following pattern.

```
<div zId="item-list">
    <div zId="item-{{item.id}}" *ngFor="let item of items"></>
</div>
```

Here, the zId will be interpolated to the item context.  Your item context property binding should be unique amongst all your items; if it isn't, then you will once again have the problem of duplicate ids in the DOM.  This also isn't as convenient as grabbing a static id, but if your QA members have consistent data, then it shouldn't be too much of an issue.  If data is constantly changing, then retrieval by id is probably not going to be the best strategy and you should consider other ways of testing.  

# How to Use

You don't.  This package is automatically installed when using a framework package.  The following is the list of available frameworks that support the ZIdentifier feature.  

<table border="0">
<tr>
    <th>ZIdentifier for Angular (4+)</th>
    <th>ZIdentifier for AngularJS (1.x)</th>
</tr>
<tr valign="middle" align="center">
<td>
<a href="https://www.npmjs.com/package/@zthun/zidentifier.angular">
    <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="128">
</a>
</td>
<td>
<a href="https://www.npmjs.com/package/@zthun/zidentifier.angularjs">
    <img src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg" width="96"/>
</a>
</td>
</tr>
</table>

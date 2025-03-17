# tracespace

> **Note:** This is a fork of [tracespace/tracespace](https://github.com/tracespace/tracespace/) which is no longer maintained by Mike Cousins. We have forked from release v4.2.8 and are continuing development from here.

tracespace is an open-source collection of tools to make looking at circuit boards on the internet easier. It converts Gerber and drill files used in PCB fabrication into SVGs for rendering and visualization.

[coverage]: https://codecov.io/gh/tracespace/tracespace
[chat]: https://gitter.im/tracespace/Lobby
[coverage-badge]: https://flat.badgen.net/codecov/c/github/tracespace/tracespace
[chat-badge]: https://flat.badgen.net/badge/chat/on%20gitter/cyan

## What's Included

### Web Application

- [**@tracespace/view**][view] - A Gerber viewer powered by the tracespace libraries.

### Core Packages

- [**pcb-stackup**][pcb-stackup] - Render PCBs as beautiful, precise SVGs from Gerber/NC drill files
- [**@tracespace/cli**][@tracespace/cli] - Render PCBs as SVGs from the comfort of your terminal
- [**gerber-to-svg**][gerber-to-svg] - Render individual Gerber/NC drill files as SVGs
- [**whats-that-gerber**][whats-that-gerber] - Identify Gerber and drill files by filename

### Supporting Libraries

- [**pcb-stackup-core**][pcb-stackup-core] - Layer stacking core logic for pcb-stackup
- [**gerber-plotter**][gerber-plotter] - Streaming layer image plotter
- [**gerber-parser**][gerber-parser] - Streaming Gerber/drill file parser
- [**@tracespace/xml-id**][@tracespace/xml-id] - XML ID generation and sanitation utilities
- [**@tracespace/fixtures**][@tracespace/fixtures] - Test fixtures for tracespace projects

[view]: ./apps/view
[pcb-stackup]: ./packages/pcb-stackup
[pcb-stackup-core]: ./packages/pcb-stackup-core
[@tracespace/cli]: ./packages/cli
[gerber-to-svg]: ./packages/gerber-to-svg
[gerber-plotter]: ./packages/gerber-plotter
[gerber-parser]: ./packages/gerber-parser
[whats-that-gerber]: ./packages/whats-that-gerber
[@tracespace/xml-id]: ./packages/xml-id
[@tracespace/fixtures]: ./packages/fixtures

## Examples

Renders of the [Arduino Uno][arduino] produced by [pcb-stackup][] and [gerber-to-svg][]:

![arduino uno top][top]
![arduino uno bottom][bottom]

Arduino Uno design files used under the terms of the [Creative Commons Attribution Share-Alike license][arduino-osh].

<details>
  <summary>Individual layers</summary>
  <h4>top copper</h4>
  <img
    title='arduino uno cmp'
    src='https://unpkg.com/gerber-to-svg@latest/example/arduino-uno.cmp.svg'
  >

  <h4>drill hits</h4>
  <img
    title='arduino uno drd'
    src='https://unpkg.com/gerber-to-svg@latest/example/arduino-uno.drd.svg'>

  <h4>outline</h4>
  <img
    title='arduino uno gko'
    src='https://unpkg.com/gerber-to-svg@latest/example/arduino-uno.gko.svg'>

  <h4>top silkscreen</h4>
  <img
    title='arduino uno plc'
    src='https://unpkg.com/gerber-to-svg@latest/example/arduino-uno.plc.svg'>

  <h4>bottom copper</h4>
  <img
    title='arduino uno sol'
    src='https://unpkg.com/gerber-to-svg@latest/example/arduino-uno.sol.svg'>

  <h4>top soldermask</h4>
  <img
    title='arduino uno stc'
    src='https://unpkg.com/gerber-to-svg@latest/example/arduino-uno.stc.svg'>

  <h4>bottom soldermask</h4>
  <img
    title='arduino uno sts'
    src='https://unpkg.com/gerber-to-svg@latest/example/arduino-uno.sts.svg'>
</details>

[arduino]: https://www.arduino.cc/
[arduino-osh]: https://www.arduino.cc/en/Main/FAQ
[top]: https://unpkg.com/pcb-stackup@latest/example/arduino-uno-top.svg
[bottom]: https://unpkg.com/pcb-stackup@latest/example/arduino-uno-bottom.svg

## Development

### Setup

The tracespace tools live here in this [monorepo][]. We use [yarn][] and [lerna][] to manage this setup.

Node v8 (lts/carbon) or later is recommended.

```shell
# clone repository and install dependencies
git clone git@github.com:tracespace/tracespace.git
cd tracespace
yarn install
```

This repository adheres to the [Conventional Changelog][conventional-changelog] commit specification for automatic changelog generation. We recommend installing [commitizen][commitizen] to ensure your commit messages are properly formatted:

```shell
yarn global add commitizen

# later, when you're ready to commit
git add some/files/*
git cz
```

All development scripts below **should be run from the root of the repository**. Lerna handles delegating scripts downwards to the individual projects as necessary.

[monorepo]: https://github.com/babel/babel/blob/main/doc/design/monorepo.md
[yarn]: https://yarnpkg.com
[lerna]: https://lernajs.io/
[conventional-changelog]: https://github.com/conventional-changelog/conventional-changelog
[commitizen]: https://commitizen.github.io/cz-cli/

### Testing

Automated tests consist of unit tests along with integration [snapshot tests][snapshot-testing] of SVG and data outputs.

```shell
# run unit and integration tests tests with coverage
yarn test

# set SNAPSHOT_UPDATE=1 to update integration test snapshots
SNAPSHOT_UPDATE=1 yarn test

# run unit tests in watch mode (no coverage)
yarn test:watch

# set INTEGRATION=1 to also include integration tests
INTEGRATION=1 yarn test:watch
```

[snapshot-testing]: https://facebook.github.io/jest/docs/en/snapshot-testing.html

### Development Servers

```shell
# run all dev servers
yarn start

# run server for a specific project
yarn start --scope @tracespace/view
```

### Building Production Assets

```shell
# build production bundles
yarn build

# build:all
# builds all production bundles, example files, and documentation
yarn build:all

# build all bundles and serve them for testing/validation
yarn serve

# as with the dev server, these commands may be scoped by name
yarn build --scope gerber-parser
yarn serve --scope @tracespace/view
```

### Code Quality

```shell
# format the code for styling
yarn format

# lint the code for potential errors
yarn lint

# typecheck any typescript code
yarn types
```

### Publishing

Packages are published to npm by the CI server. To publish a release, you must have write access to the repository.

```shell
# checkout and pull latest from main
git checkout main
git pull origin main

# bump version (defaults to conventional commits recommendation)
yarn bump

# push commit and tag
git push origin main --follow-tags
```

For more detailed publishing options, see the [full documentation](#publishing) below.
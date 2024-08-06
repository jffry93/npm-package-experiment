# TK WP Toolkit test
---

## Requirements

- Node.js v20
- pnpm v9

## Installation

To install the dependencies for the project, run the following command:

```bash
pnpm install
```

## Usage

### Updating the Version

To update the version in `package.json` and manage changesets, follow these steps:


1. **Create a New Changeset**
   Generate a changeset which will determine how package versions are bumped:

   ```bash
   pnpm changeset
   ```

2. **Update Versions**
   Apply the changeset to update the version in `package.json`:

   ```bash
   pnpm changeset version
   ```

3. **Release**
   Build and publish your package using the changesets:

   ```bash
   pnpm release
   ```

   This script will run the build process and then publish your package to the npm registry.
	 This will only publish to npm if you have the authentication set up.


## Contributing

When contributing to this repository, please follow the guidelines outlined in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Getting Started

These instructions will guide you through setting up and running the project locally.

### Running Locally

To run the project on your local development server, execute:

## Building the Package

Compile the TypeScript code to JavaScript (adjust this step based on your build setup):

```bash
pnpm build
```

## Linking the Package Locally

Link the package globally to make it available across your system:

```bash
pnpm link --global
```

## Testing the Package in a Project

Navigate to your testing project and link the package:

```bash
cd path/to/your-testing-project
pnpm link --global your-package-name
```

Because this was linked with pnpm make sure to use this when using the package in the testing project.
Now, you can use and test the package as if it were installed from the npm registry.

When anything changes in the linked package this will automatically update the node_modules since it is referencing the original directory.

## Unlinking the Package

After testing, you may unlink the package:

```bash
cd path/to/your-testing-project
pnpm unlink your-package-name
```

## Using Storybook

Storybook is an open-source tool for developing UI components in isolation. It makes building stunning UIs organized and efficient.

### Running Storybook

To run Storybook, use the following command:

```bash
pnpm storybook
```

This will start Storybook locally and open it in your default browser. Typically, it runs on `http://localhost:6006`.

### Contributing with Storybook

Storybook is crucial for our component development. Here’s how you can use it to contribute:

- **View Existing Components**: Navigate through existing components to understand their functionality and usage.
- **Develop New Components**: When adding a new component, create a corresponding Storybook file to demonstrate its features.
- **Iterate on Components**: Use Storybook to test out different states and edge cases during development.

## Feedback

Please report any issues or feedback to the issues section of the repository.
```

This README provides a clear guide for developers to test your package locally. Adjust the example commands and repository URLs to match your actual package details and development workflow.

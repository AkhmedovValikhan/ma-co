module.exports = {
    "roots": [
        "<rootDir>/src",
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
    },
    "moduleNameMapper": {
        "\\.(css|scss)$": "identity-obj-proxy",
    },
    "setupFilesAfterEnv": ["<rootDir>/src/enzyme-setup.js"],
    "coverageDirectory": "./coverage/",
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!<rootDir>/node_modules/",
        "!<rootDir>/src/index.js"
    ],

};

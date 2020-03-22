<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/datasign/master/about/identity/datasign-logo-black.png" height="250px">
    <br />
    <a target="_blank" href="https://www.npmjs.com/package/@plurid/datasign">
        <img src="https://img.shields.io/npm/v/@plurid/datasign.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
    </a>
    <a target="_blank" href="https://github.com/plurid/datasign/blob/master/packages/datasign/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: MIT">
    </a>
</p>



<h1 align="center">
    datasign
</h1>


CLI for the single source of truth data specificator [datasign](https://github.com/plurid/datasign).


## Usage

    datasign <files>

## Options

    -v, --version           output the version number
    -t, --target <type>     compilation targets: typescript, graphql, protobuf (default: "typescript,graphql,protobuf")
    -o, --output <path>     output path (default: ".")
    -r, --resolve <type>    resolve the output path relative to "file" directory, "process" directory, or "flatten" into the output path (default: "file")
    -c, --comments          compile the comments into the target files (default: false)
    -s, --spacing <value>   spacing to be used in the compiled files (default: "4")
    -p, --preserve <value>  preserve new lines spacing of the datasign file (default: false)
    -h, --help              display help for command

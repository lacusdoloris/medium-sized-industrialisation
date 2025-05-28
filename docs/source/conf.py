# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

from importlib.metadata import version as get_version

import sphinx
import sphinx.application

project = "Medium Sized Industrialisation"
copyright = "2024-2025, Loris Lacuna"
author = "Loris Lacuna"

raw_version = get_version("medium-sized-industrialisation")
release = raw_version.split("+", 1)[0]

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    "sphinx_inline_tabs",
    "myst_parser",
    "sphinx.ext.mathjax",
    "sphinx_toolbox.collapse"
]

templates_path = ["_templates"]
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "furo"
html_static_path = ["_static"]
html_css_files = ["css/custom.css"]

def setup(app: sphinx.application.Sphinx):
    app.add_js_file("mathjax-config.js")
    pass

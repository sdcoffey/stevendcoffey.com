###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

activate :syntax
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true

configure :development do
	activate :livereload
end

activate :blog do |blog|
	blog.prefix = "words"
	blog.layout = "blog_layout"
end

helpers do
end

configure :build do
	activate :minify_css
	activate :minify_javascript
end

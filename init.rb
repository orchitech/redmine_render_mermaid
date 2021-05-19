require_dependency 'redmine_render_mermaid'

Redmine::Plugin.register :redmine_render_mermaid do
  name 'Redmine Render Mermaid plugin'
  author 'Martin Cizek <martin.cizek@orchitech.cz>'
  description 'Render mermaid code blocks as diagrams'
  version '0.0.1'
  url 'https://github.com/orchitech/redmine_render_mermaid'
  author_url 'https://orchi.tech/'
end

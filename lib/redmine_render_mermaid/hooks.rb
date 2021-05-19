# frozen_string_literal: true

module RedmineRenderMermaid
  class Hooks < Redmine::Hook::ViewListener
    PLUGIN = 'redmine_render_mermaid'

    def view_layouts_base_html_head(context = {})
      lib = javascript_path("/plugin_assets/#{PLUGIN}/javascripts/mermaid.min")
      html = String.new
      html << javascript_tag("redmine_render_mermaid_lib = '#{escape_javascript(lib)}';")
      html << javascript_include_tag('render_mermaid', :plugin => PLUGIN)
      html
    end

    def view_journals_update_js_bottom(context = {})
      journal = context[:journal]
      unless journal.frozen?
        "renderMermaid($('div.wiki#journal-#{journal.id}-notes'));\n"
      end
    end
  end
end

module SeoHelper

  MAX_TITLE_LENGTH = 65

  def meta_title
    title = content_for(:meta_title)

    if title
      site_title = I18n.t('seo.default.short_title')
      if title.length + site_title.length > MAX_TITLE_LENGTH
        site_title = I18n.t('seo.default.website_name')
      end

      return title + ' – ' + site_title
    end

    return I18n.t('seo.default.title')
  end

  def meta_description
    content_for?(:meta_description) ? content_for(:meta_description) : I18n.t('seo.default.description')
  end

  def canonical_url
    content_for?(:canonical_url) ? content_for(:canonical_url) : root_url
  end

  def meta_robots
    content_for?(:meta_robots) ? content_for(:meta_robots) : 'index, follow'
  end

  def open_graph
    content_for?(:open_graph) ? content_for(:open_graph) : ''
  end

end
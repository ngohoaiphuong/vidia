module BreadcrumbHelper  
  def breadcrumbs
    @breadcrumbs ||= [
      {
        title: t('breadcrumb.homepage'),
        url: root_url,
        icon: '<span class="fas fa-home"/>'.html_safe
      }
    ]
  end

  def add_breadcrumb(key, url)
    breadcrumbs << {
      title: t("breadcrumb.#{key}"),
      url: url
    }
  end
end
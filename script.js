//"https://api.github.com/users/MC3D"
//"https://api.github.com/users/MC3D/repos"
//"https://api.github.com/users/jacobthemyth/starred"
//"https://api.github.com/users/jacobthemyth/orgs"

function renderTemplate(templateId, location, model) {
    var templateString = $(templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(model);
    $(location).append(renderedTemplate);
}

$.getJSON("https://api.github.com/users/MC3D").done(function(item) {
  var userData = {
      avatar: item.avatar_url,
      avatar_url: item.html_url,
      username: item.login,
      name: item.name,
      memberSince: moment(item.created_at).format("MMM DD, YYYY"),
      followers: item.followers,
      followers_url: item.followers_url,
      following: item.following,
      following_url: item.following_url
  };

    $.getJSON("https://api.github.com/users/MC3D/starred").done(function(item) {
            userData.starred = item.length,

    $.getJSON("https://api.github.com/users/MC3D/orgs").done(function(item) {

          _.each(item, function(item) {
          userData.org_avatar = item.avatar_url;
          userData.org_avatar_url = item.html_url;
        });

          renderTemplate('#header-user', '#header', userData);
          renderTemplate('#sidebar-user', '#sidebar', userData);
    });
    });
});


$.getJSON("https://api.github.com/users/MC3D/repos").done(function(item) {
  var sortData = _.sortBy(item, 'updated_at').reverse();
  _.each(sortData, function(item) {
    var repoData = {
        name: item.name,
        updated: moment(item.updated_at).fromNow(),
        language: item.language,
        stargazers: item.stargazers_count,
        forks: item.forks,
        repoUrl: item.html_url
    };

    renderTemplate('#repo-data', '#main-content', repoData);
  });
});

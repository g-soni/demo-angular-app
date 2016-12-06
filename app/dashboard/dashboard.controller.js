module.exports = function(dashboard) {
  dashboard.controller('DashboardController', ['$timeout', 'DashboardService', function($timeout, dashboardService) {
    var dashboard = this;
    var pageRequired = 1;
    var maxPage = 2;
    dashboard.photos = [];
    dashboard.search = {keyword: "inspection"};
    dashboard.tagSuggestions = [];
    
		dashboard.addMorePhotos = function() {
			if (pageRequired + 1 > maxPage || dashboard.photoLoading) {
				return;
			}	 

			dashboard.photoLoading = true;

			dashboardService.flickrPhotoSearch(pageRequired, dashboard.search.keyword).then(function(data) {
				var photos = data.data.photos;
				dashboard.photos = dashboard.photos.concat(photos.photo);
				maxPage =	photos.pages;
				pageRequired = photos.page + 1;
				dashboard.photoLoading = false;
			});
		}
		
		//initial loading of photos
		dashboard.addMorePhotos();
		
		dashboard.resetParams = function() {
			dashboard.tagSuggestions = [];
			pageRequired = 1;
			maxPage = 2;
			dashboard.photos = [];
			dashboardService.flickrTagRelatedSuggestion(dashboard.search.keyword).then(function(data){
				dashboard.tagSuggestions = data.data.tags.tag;
			});
			dashboard.addMorePhotos();
		}
			
		dashboard.selectSuggestion = function(tagname) {
			dashboard.search.keyword = tagname;
			dashboard.resetParams();
		}
		
		dashboard.clearSuggestion = function() {
			$timeout(function() {
				dashboard.tagSuggestions = [];
			}, 500);
		} 

  }]);
};

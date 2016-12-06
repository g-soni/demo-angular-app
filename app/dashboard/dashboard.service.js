module.exports = function(appModule) {
  return appModule.service('DashboardService',['$http', 'InspectionConfig', function($http, InspectionConfig) {
		this.flickrPhotoSearch = function(page, tagName) {
			if (tagName){
				return $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + InspectionConfig.FLICKR_API_KEY + '&tags=' + tagName + '&page=' + page + '&per_page=20&format=json&jsoncallback=JSON_CALLBACK').success(function (data) {});
		  } else {
			  return $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=' + InspectionConfig.FLICKR_API_KEY + '&page=' + page + '&per_page=20&format=json&jsoncallback=JSON_CALLBACK').success(function (data) {});
		    
			}
		}
		
		this.flickrTagRelatedSuggestion = function(tagName) {
			return $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=' + InspectionConfig.FLICKR_API_KEY + '&tag=' + tagName + '&format=json&jsoncallback=JSON_CALLBACK').success(function (data) {});
		}
  }]);
};

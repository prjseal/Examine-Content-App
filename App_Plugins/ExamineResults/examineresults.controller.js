angular.module("umbraco")
    .controller("My.CakeContentApp", function ($scope, umbRequestHelper, $log, $http, $q, $timeout, editorState) {

        $scope.searcherDetails = [];
        $scope.loading = true;
       
        $scope.search = function(searcher, e) {
            e.preventDefault();
    
            console.log(searcher);
    
            umbRequestHelper.resourcePromise(
                    $http.get(umbRequestHelper.getApiUrl("examineMgmtBaseUrl",
                        "GetSearchResults",
                        {
                            searcherName: searcher.name,
                            query: encodeURIComponent(editorState.current.key),
                            queryType: searcher.searchType
                        })),
                    'Failed to search')
                .then(function(searchResults) {
                    searcher.isSearching = true;
                    searcher.searchResults = searchResults;
                });
        }
    
        $scope.closeSearch = function(searcher) {
            searcher.isSearching = true;
        }
    
        //go get the data
    
        //combine two promises and execute when they are both done
        $q.all([
    
                // //get the indexer details
                // umbRequestHelper.resourcePromise(
                //     $http.get(umbRequestHelper.getApiUrl("examineMgmtBaseUrl", "GetIndexerDetails")),
                //     'Failed to retrieve indexer details')
                // .then(function(data) {
                //     $scope.indexerDetails = data;
                // }),
    
                //get the searcher details
                umbRequestHelper.resourcePromise(
                    $http.get(umbRequestHelper.getApiUrl("examineMgmtBaseUrl", "GetSearcherDetails")),
                    'Failed to retrieve searcher details')
                .then(function(data) {
                    $scope.searcherDetails = data;
                    for (var s in $scope.searcherDetails) {
                        $scope.searcherDetails[s].searchType = "text";
                    }
                })
            ])
            .then(function() {
                //all init loading is complete
                $scope.loading = false;
            });


    });
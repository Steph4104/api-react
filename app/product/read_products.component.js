// component that contains all the logic and other smaller components
// that form the Read Products view
window.ReadProductsComponent = React.createClass({
    getInitialState: function() {
        return {
            products: [],
            value:'select'
        };
    },
    componentDidMount: function() {
        this.serverRequest = $.get("http://localhost/my_super_app/api/product/read.php", function (products) {
            this.setState({
                products: products.records
            });
        }.bind(this));
    },
    // on mount, fetch all products and stored them as this component's state
    handleClick: function(event){
        this.setState({value: event.target.value});

        var value = event.target.value;
       
        this.serverRequest = $.get("http://localhost/my_super_app/api/product/filter.php?category="+value, function (products) {
            this.setState({
                products: products.records
            });
        }.bind(this));
    },

    handleInput: function(event){
        this.setState({search: event.target.value});

        var value = event.target.value;
       
        this.serverRequest = $.get("http://localhost/my_super_app/api/product/search.php?s="+value, function (products) {
            this.setState({
                products: products.records
            });
        }.bind(this));
    },

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
 
    // render component on the page
    render: function() {
        // list of products
        var filteredProducts = this.state.products;
        return (
            <div className='overflow-hidden'>
            
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />
        
                <div className='button__container'>
     
        <select onChange={this.handleClick} value={this.state.value}>
  <option value="books">books</option>
  <option value="movie">movie</option>
  <option value="fashion">fashion</option>
  <option value="electronics">electronics</option>
  <option value="">all</option>
  
</select>

<input type='text' name='search' onChange={this.handleInput}/>
      </div>
 
                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
});
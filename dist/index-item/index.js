Component({
    externalClasses: ['i-class'],
    properties : {
        name : {
            type : String,
            value : ''
        }
    },
    relations : {
        '../index/index' : {
            type : 'parent'
        }
    },
    data : {
        top : 0,
        height : 0,
        currentName : '',
        inx:0,
    },
    methods: {
        updateDataChange() {
            const className = '.i-index-item';
            const query = wx.createSelectorQuery().in(this);
            query.select( className ).boundingClientRect((res)=>{
                    this.setData({
                        top : res.top,
                        height : res.height,
                        currentName : this.data.name
                    })
            }).exec()
        }
    }
})
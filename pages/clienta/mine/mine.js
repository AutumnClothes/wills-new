Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    tab4: {
      type: Boolean,
      value: ''
    }
  },
  data: {
    text: 'mine',
  },
  attached() {
  },
  methods: {
    tapchange() {
      var bb = this.data.tab4
      if (bb) {
        console.log("代码块4执行：", bb)
      }
    }
  }
})
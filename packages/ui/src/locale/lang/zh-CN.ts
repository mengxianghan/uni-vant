export default {
  name: '姓名',
  tel: '电话',
  save: '保存',
  clear: '清空',
  cancel: '取消',
  confirm: '确认',
  delete: '删除',
  loading: '加载中...',
  noCoupon: '暂无优惠券',
  nameEmpty: '请填写姓名',
  addContact: '添加联系人',
  telInvalid: '请填写正确的电话',
  vanCalendar: {
    end: '结束',
    start: '开始',
    title: '日期选择',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: (year: unknown, month: unknown) => `${year}年${month}月`,
    rangePrompt: (maxRange: unknown) => `最多选择 ${maxRange} 天`,
  },
  vanCascader: {
    select: '请选择',
  },
  vanPagination: {
    prev: '上一页',
    next: '下一页',
  },
  vanPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...',
  },
  vanSubmitBar: {
    label: '合计:',
  },
  vanCoupon: {
    unlimited: '无门槛',
    discount: (discount: unknown) => `${discount}折`,
    condition: (condition: unknown) => `满${condition}元可用`,
  },
  vanCouponCell: {
    title: '优惠券',
    count: (count: unknown) => `${count}张可用`,
  },
  vanCouponList: {
    exchange: '兑换',
    close: '不使用',
    enable: '可用',
    disabled: '不可用',
    placeholder: '输入优惠码',
  },
  vanAddressEdit: {
    area: '地区',
    areaEmpty: '请选择地区',
    addressEmpty: '请填写详细地址',
    addressDetail: '详细地址',
    defaultAddress: '设为默认收货地址',
  },
  vanAddressList: {
    add: '新增地址',
  },
}

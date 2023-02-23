'use strict';

module.exports = {
  linalg_dialect: $ => prec.right(choice(
    seq(choice('linalg.batch_matmul', 'linalg.batch_matmul_transpose_b', 'linalg.batch_matvec',
      'linalg.batch_reduce_matmul', 'linalg.broadcast', 'linalg.conv_1d_ncw_fcw',
      'linalg.conv_1d_nwc_wcf', 'linalg.conv_1d', 'linalg.conv_2d_nchw_fchw',
      'linalg.conv_2d_ngchw_fgchw', 'linalg.conv_2d_nhwc_fhwc', 'linalg.conv_2d_nhwc_hwcf', 'linalg.conv_2d_nhwc_hwcf_q', 'linalg.conv_2d', 'linalg.conv_3d_ndhwc_dhwcf',
      'linalg.conv_3d_ndhwc_dhwcf_q', 'linalg.conv_3d', 'linalg.copy',
      'linalg.depthwise_conv_1d_nwc_wc', 'linalg.depthwise_conv_1d_nwc_wcm',
      'linalg.depthwise_conv_2d_nchw_chw', 'linalg.depthwise_conv_2d_nhwc_hwc',
      'linalg.depthwise_conv_2d_nhwc_hwc_q', 'linalg.depthwise_conv_2d_nhwc_hwcm',
      'linalg.depthwise_conv_2d_nhwc_hwcm_q', 'linalg.depthwise_conv_3d_ndhwc_dhwc',
      'linalg.depthwise_conv_3d_ndhwc_dhwcm', 'linalg.dot', 'linalg.elemwise_binary',
      'linalg.elemwise_unary', 'linalg.fill', 'linalg.fill_rng_2d', 'linalg.matmul',
      'linalg.matmul_transpose_b', 'linalg.matmul_unsigned', 'linalg.matvec', 'linalg.mmt4d',
      'linalg.pooling_nchw_max', 'linalg.pooling_nchw_sum', 'linalg.pooling_ncw_max',
      'linalg.pooling_ncw_sum', 'linalg.pooling_ndhwc_max', 'linalg.pooling_ndhwc_min',
      'linalg.pooling_ndhwc_sum', 'linalg.pooling_nhwc_max', 'linalg.pooling_nhwc_max_unsigned',
      'linalg.pooling_nhwc_min', 'linalg.pooling_nhwc_min_unsigned', 'linalg.pooling_nhwc_sum',
      'linalg.pooling_nwc_max', 'linalg.pooling_nwc_max_unsigned', 'linalg.pooling_nwc_min',
      'linalg.pooling_nwc_min_unsigned', 'linalg.pooling_nwc_sum',
      'linalg.quantized_batch_matmul', 'linalg.quantized_matmul', 'linalg.vecmat'),
      repeat1($._ins_outs_attributes),
      field('return', optional($._function_return))),

    seq('linalg.generic',
      repeat1($._ins_outs_attributes),
      field('body', $.region),
      field('return', optional($._function_return))),

    // operation ::= `linalg.index` $dim attr-dict `:` type($result)
    seq('linalg.index',
      field('dimension', $.integer_literal),
      field('attributes', optional($.attribute)),
      field('return', $._type_annotation)),

    seq(choice('linalg.map', 'linalg.reduce'),
      repeat1($._ins_outs_attributes),
      field('arguments', $.block_arg_list),
      field('body', $.region),
      field('return', optional($._function_return))),

    seq('linalg.yield',
      field('attributes', optional($.attribute)),
      field('results', optional($._value_use_type_list)))
  )),

  _ins_outs_attributes: $ => choice($._ins, $._outs, $.attribute,
    $._attribute_entry_list),
  _ins: $ => seq(token('ins'), '(', $._value_use_type_list, ')'),
  _outs: $ => seq(token('outs'), '(', $._value_use_type_list, ')'),
  _attribute_entry_list: $ => seq($.bare_attribute_entry,
    repeat(seq(',', $.bare_attribute_entry))),
  bare_attribute_entry: $ => seq($.bare_id, '=', $.attribute_value)
}

export const D_GRAPH_RESPONSE = {
  'data': {
    'expand': [
      {
        '_uid_': 0x2,
        'connected': [
          {
            '_uid_': 0x3,
            'name': 'Server 1',
            'connected': [
              {
                '_uid_': 0x5
              }
            ],
            'ip': '10.0.0.6'
          },
          {
            '_uid_': 0x4,
            'name': 'Server 2',
            'ip': '10.0.0.8'
          }
        ],
        'ip': '10.0.0.5',
        'name': 'Client',
        'stack': 'node'
      },
      {
        '_uid_': 0x3,
        'connected': [
          {
            '_uid_': 0x5,
            'name': 'Server 4',
            'ip': '10.0.1.1'
          }
        ],
        'ip': '10.0.0.6',
        'name': 'Server 1',
        'stack': 'node'
      },
      {
        '_uid_': 0x4,
        'ip': '10.0.0.8',
        'name': 'Server 2',
        'stack': 'node'
      },
      {
        '_uid_': 0x5,
        'ip': '10.0.1.1',
        'name': 'Server 4',
        'stack': 'node'
      },
      {
        '_uid_': 0x6,
        'ip': '10.0.1.1',
        'name': 'Alone Man',
        'stack': 'node'
      }
    ],
    'server_latency': {
      'parsing': '106µs',
      'processing': '466µs',
      'json': '106µs',
      'total': '680µs'
    }
  }
};

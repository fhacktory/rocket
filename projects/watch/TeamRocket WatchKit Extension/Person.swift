//
//  Person.swift
//  TeamRocket WatchKit Extension
//
//  Created by Nicolas Lebrun on 24/10/2019.
//  Copyright © 2019 Nicolas Lebrun. All rights reserved.
//

import Foundation

struct MeetingState: Codable {
    let totalCost: String
    let persons: [Person]
    let bullshitCounter: Int
    let remainingTime: String
}

struct Person: Codable, Identifiable {
    let id: Int
    let name: String
    let totalCost: String
}

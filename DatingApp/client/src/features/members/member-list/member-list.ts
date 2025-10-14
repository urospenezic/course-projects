import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Observable } from 'rxjs';
import { Member, MemberParams } from '../../../types/member';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from '../member-card/member-card';
import { PaginatedResult } from '../../../types/pagination';
import { Paginator } from '../../../shared/paginator/paginator';
import { FilterModal } from '../filter-modal/filter-modal';

@Component({
  selector: 'app-member-list',
  imports: [MemberCard, Paginator, FilterModal],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
  @ViewChild('filterModal') modal!: FilterModal;
  private readonly memberService = inject(MemberService);
  private updatedParams = new MemberParams();
  protected memberParams = new MemberParams();
  protected paginatedMembers = signal<PaginatedResult<Member> | null>(null);

  constructor() {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      this.memberParams = JSON.parse(savedFilters);
      this.updatedParams = JSON.parse(savedFilters);
    }
  }

  ngOnInit() {
    this.memberService.member.set(null);
    this.loadMembers();
  }

  onPageChange(pageNumber: number, pageSize: number) {
    this.memberParams.pageNumber = pageNumber;
    this.memberParams.pageSize = pageSize;
    this.loadMembers();
  }

  openModal() {
    this.modal.open();
  }

  onClose() {}

  onFilterChanged(data: MemberParams) {
    this.memberParams = { ...data }; //to avoid reference issues
    this.updatedParams = { ...data };
    this.loadMembers();
  }

  resetFilters() {
    this.memberParams = new MemberParams();
    this.updatedParams = new MemberParams();
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.memberParams).subscribe({
      next: (response) => {
        this.paginatedMembers.set(response);
      },
    });
  }

  get displayMessage(): string {
    const defaultParams = new MemberParams();
    const filters: string[] = [];
    if (this.updatedParams.gender) {
      filters.push(`${this.updatedParams.gender}s`);
    } else {
      filters.push('Males, Females');
    }

    if (
      this.updatedParams.minAge !== defaultParams.minAge ||
      this.updatedParams.maxAge !== defaultParams.maxAge
    ) {
      filters.push(`Age ${this.updatedParams.minAge} - ${this.updatedParams.maxAge}`);
    }

    filters.push(
      `Sorted by ${this.updatedParams.orderBy === 'lastActive' ? 'Last Active' : 'Created'}`
    );

    return filters.length > 0 ? `Selected: ${filters.join(' | ')}` : 'All Members';
  }
}
